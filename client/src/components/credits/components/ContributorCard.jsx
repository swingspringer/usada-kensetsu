import React from 'react';
import { AiOutlineTwitter } from 'react-icons/ai'
import { SiPixiv } from 'react-icons/si'
import { FaDiscord, FaDeviantart, FaFacebook, FaYoutube } from 'react-icons/fa'

import ExternalLink from '../../ExternalLink';

import classes from '../Credits.module.css';

export default class ContributorCard extends React.Component {

    render() {
        // Change this if necessary
        const avatar_placeholder_url = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

        return (
            <div className="mb-5 d-flex justify-content-center align-items-center">
                <div className={"card " + classes.pekoraCardsm}>
                    <div className="card-body text-center d-flex justify-content-center align-items-center flex-column">
                        <div className={classes.pekoreCardImageHolder}>
                            <img
                                src={this.props.avatar_url || avatar_placeholder_url}
                                className="rounded-circle w-100"
                                alt="avatar" />
                        </div>
                        <div className="d-flex justify-content-center align-items-center flex-column pt-3 pb-2">
                            <p className="lead m-0">
                                {this.props.name}
                            </p>
                            <small className="font-weight-bold">
                                <a href={this.props.mainSocialLink} target="_blank" className="text-decoration-none" rel="noreferrer">
                                    {this.props.mainSocialUsername}
                                </a>
                            </small>
                        </div>
                        {this.props.specialThanks &&
                            <div className={classes.specialThanksContainer}>
                                <p>
                                    {this.props.specialThanks}
                                </p>
                            </div>
                        }
                    </div>
                    {this.props.links &&
                        <div className="card-footer bg-transparent d-flex justify-content-center credits-body">
                            {this.props.links.twitter &&
                                <div className="m-0 px-1">
                                    <ExternalLink className={classes.socialLinkIcon} href={this.props.links.twitter} excludeIcon><AiOutlineTwitter /></ExternalLink>
                                </div>
                            }
                            {this.props.links.youtube &&
                                <div className="m-0 px-1">
                                    <ExternalLink className={classes.socialLinkIcon} href={this.props.links.youtube} excludeIcon><FaYoutube /></ExternalLink>
                                </div>
                            }
                            {this.props.links.discord &&
                                <div className="m-0 px-1">
                                    <ExternalLink className={classes.socialLinkIcon} href={this.props.links.discord} excludeIcon><FaDiscord /></ExternalLink>
                                </div>
                            }
                            {this.props.links.deviantart &&
                                <div className="m-0 px-1">
                                    <ExternalLink className={classes.socialLinkIcon} href={this.props.links.deviantart} excludeIcon><FaDeviantart /></ExternalLink>
                                </div>
                            }
                            {this.props.links.facebook &&
                                <div className="m-0 px-1">
                                    <ExternalLink className={classes.socialLinkIcon} href={this.props.links.facebook} excludeIcon><FaFacebook /></ExternalLink>
                                </div>
                            }
                            {this.props.links.pixiv &&
                                <div className="m-0 px-1">
                                    <ExternalLink className={classes.socialLinkIcon} href={this.props.links.pixiv} excludeIcon><SiPixiv /></ExternalLink>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}