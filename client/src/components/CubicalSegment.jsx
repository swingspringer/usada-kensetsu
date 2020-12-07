import React, { useCallback, useState } from 'react'
import {Spinner, UncontrolledTooltip} from 'reactstrap';
import {FiEye, FiEyeOff, FiInfo} from 'react-icons/fi'
import Iframe from 'react-iframe'
import ExternalLink from './ExternalLink'
import '../css/CubicalSegment.css'
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { mobileBreakPoint } from '../helpers/responsive';
import { AiFillCloseCircle, AiOutlineExpand } from 'react-icons/ai';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const CubicalSegment = ({data, showByDefault}) => {
    const isMobile = useMediaQuery({ maxWidth: mobileBreakPoint })
    const [hiddenCubicalInd, setHiddenCubicalInd] = useState(showByDefault ? !(showByDefault === 'true') : true)
    const [cubicalLoadingInd, setCubicalLoadingInd] = useState(false)
    const dataParsed = JSON.parse(data)
    const cubicalHandle = useFullScreenHandle()
    const onChange = useCallback((state, handle) => {
        if(handle.active){
            window.screen.orientation.lock('landscape');
        } else {
            window.screen.orientation.unlock();
        }
    }, [cubicalHandle]);
    
    const onShowCubical = () => {
        setHiddenCubicalInd(false)
        setCubicalLoadingInd(true)
    }

    const onHideCubical = () => {
        setHiddenCubicalInd(true)
        setCubicalLoadingInd(false)
    }

    return (
        <>
            <div className="header-tools-wrapper">
                {hiddenCubicalInd ?
                    <>
                    <div className="show-cubical-wrapper" onClick={onShowCubical}>
                        <FiEye />
                        <div className="show-cubical-label">Show Cubical</div>
                    </div>

                    <FiInfo id="cubicalinfo"/>
                    <UncontrolledTooltip placement="right" target="cubicalinfo">
                        We hide this by default to prevent lag
                    </UncontrolledTooltip>
                    </>
                :
                    <div className="hide-cubical-wrapper">
                        <div className="hide-cubical-label" onClick={onHideCubical}> {!isMobile && 'Hide Cubical'} <FiEyeOff size={isMobile ? 30 : 15} /></div>
                        <div className="hide-cubical-label" onClick={cubicalHandle.enter}> {!isMobile && 'Go Fullscreen'} <AiOutlineExpand size={isMobile ? 30 : 15}/></div>
                        
                        {cubicalLoadingInd ? 
                            <Spinner color="secondary" className="cubical-spinner"/> 
                        : 
                            null
                        }
                    </div>
                }
            </div>

            {!hiddenCubicalInd &&
                <>
                <FullScreen onChange={onChange} handle={cubicalHandle}>
                {cubicalHandle.active && <div onClick={() => cubicalHandle.exit()} className="close-button"><AiFillCloseCircle size={30}></AiFillCloseCircle></div>}
                    <div className={classNames("iframe-container", {fullscreen: cubicalHandle.active})}>
                        <Iframe allowFullScreen={true} url={dataParsed.link} className="cubical-container" onLoad={() => setCubicalLoadingInd(false)} />
                    </div>
                </FullScreen>
                <div><i>Model imitated by <ExternalLink href={dataParsed.creator_source} style={{color: '#787878'}}>Saaya</ExternalLink></i></div>
                </>
            }
        </>
    )
}

export default CubicalSegment