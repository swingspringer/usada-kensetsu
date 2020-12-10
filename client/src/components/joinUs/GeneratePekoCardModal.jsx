import React, { useState } from 'react'
import { Alert, Modal, ModalBody, ModalHeader, Tooltip } from 'reactstrap'
import NewWindow from 'react-new-window'
import { FiPrinter, FiDownload, FiLink} from 'react-icons/fi'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import PekoCard from './PekoCard'
import PDFPekocardGenerator from './PDFPekocardGenerator'
import ImagePekocardGenerator from './ImagePekocardGenerator'
import { useMediaQuery } from 'react-responsive'
import { mobileBreakPoint } from '../../helpers/responsive'
import '../../css/GeneratePekoCardModal.css'

const ACTION_NONE = null
const ACTION_PRINT = 1
const ACTION_DOWNLOAD = 2

const GeneratePekoCardModal = ({isModalOpen, toggleModal, loggedInUser}) => {
    const user = JSON.parse(loggedInUser)
    const [action, setAction] = useState(ACTION_NONE)
    const currentLocation = window.location.href

    const [isCopied, setIsCopied] = useState(false)
    const pekoCardLink = `${currentLocation}pekoCard/${user.id}`
    const [isPopupBlocked, setIsPopupBlocked] = useState(false)
    const isMobile = useMediaQuery({ maxDeviceWidth: mobileBreakPoint });

    const onDownloadSuccess = () => {
        setAction(ACTION_NONE)
    }

    const toggleIsCopied = () => setIsCopied(!isCopied)

    const toggleBlockedPopup = () => setIsPopupBlocked(!isPopupBlocked)


    return (
        <>
        <Modal isOpen={isModalOpen} className="generated-modal-wrapper">
            <ModalHeader toggle={toggleModal} style={{borderBottom: 'none', justifyContent: 'center', paddingBottom: '0'}}>
                <div className="generated-congratulations">CONGRATULATIONS!</div>
                <div className="generated-header">Welcome to Usada Construction</div>
            </ModalHeader>
            
            <ModalBody className="generated-body-wrapper">
                <div className="generated-description">
                    Please print the PekoCard below before and wear before entering PekoLand office premises. Tampering with
                    the ID will not be tolerated and will be subject to PekoPunishments.
                </div>

                <div className="generated-wrapper">
                    <PekoCard front userStr={loggedInUser} />
                    <PekoCard back userStr={loggedInUser} />
                </div>
                
                <div className="generated-rec-size">The recommended print size is: 3.38" x 2.36"</div>

                <div className="generated-note">
                    This ID is for entertainment purposes only and should not be used for transactions or identification in 
                    real life.
                </div>

                <Alert color="danger" isOpen={isPopupBlocked} toggle={toggleBlockedPopup}>
                    The Browser blocked the sign in popup😭. Please allow the popup to proceed with signing in
                </Alert>

                <div className="generated-footer-buttons">
                    {!isMobile && <button onClick={() => setAction(ACTION_PRINT)}><FiPrinter /> Print</button>}
                    <button onClick={() => setAction(ACTION_DOWNLOAD)}><FiDownload /> Download image</button>

                    <CopyToClipboard text={pekoCardLink} onCopy={() => setIsCopied(true)}>
                        <button id="copyPekocardLink" onMouseLeave={() => setIsCopied(false)}><FiLink /> Copy PekoCard Link</button>
                    </CopyToClipboard>
                    
                    {isCopied &&
                        <Tooltip placement="top" target="copyPekocardLink" isOpen={isCopied} toggle={toggleIsCopied}>Successfully copied to clipboard!</Tooltip>
                    }
                </div>

                
            </ModalBody>
        </Modal>

        {action &&
            <NewWindow features={{ width: 1920, height: 1080 }} onUnload={() => setAction(ACTION_NONE)} onBlock={toggleBlockedPopup}>
                {action === ACTION_DOWNLOAD ?
                    <ImagePekocardGenerator userStr={loggedInUser} onDownloadSuccess={onDownloadSuccess} />
                :
                 action === ACTION_PRINT &&
                    <PDFPekocardGenerator userStr={loggedInUser} />
                }
            </NewWindow>
        }
        </>
    )
}

export default GeneratePekoCardModal