import React, { useState } from 'react'
import Logo from "../assets/logo.svg"
import DownloadIcon from "../assets/IconDownload.svg"
import RotateIcon from "../assets/IconRotate.svg"
import NextIcon from "../assets/IconNext.svg"
import BackIcon from "../assets/IconBack.svg"
import FbIcon from "../assets/facebook.svg"
import InstaIcon from "../assets/instagram.svg"
import download from 'downloadjs'
import { toPng } from 'html-to-image'
import {
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

const ShareContent = ({ id, title, contentFront, contentBack, isRotated, isDownloaded = false, onNext, onBack }) => {
    const url = window.location.protocol + '//' + window.location.host + (isRotated ? '/riddles/' + id : '/jokes/' + id);
    const [side, setSide] = useState(0);
    const saveImage = () => {
        toPng(document.getElementById('ImageFrontTarget'))
            .then(function (dataUrl) {
                let name = isRotated ? (side === 0 ? 'Riddle-' + id + '-question.png' : 'Riddle-' + id + '-answer.png') : 'joke-' + id + '.png';
                download(dataUrl, name);
            });
    }
    const switchSide = () => {
        setSide((prev) => prev === 0 ? 1 : 0);
    }

    return (
        <div className='share-content'>

            {isDownloaded ?
                <>
                    <div className='share-content__img-container'>
                        <div className='share-content__img' id='ImageFrontTarget'>
                            <img src={Logo} alt="logo" className='share-content__logo' />

                            <div className={isRotated && side === 1 ? 'card rotated export' : 'card'}>

                                {isRotated && side === 0 &&
                                    <div className='card__title'>
                                        {title}
                                    </div>
                                }
                                <div className='card__content'>
                                    <p className='card__content-front'>{contentFront}</p>
                                    {isRotated && side === 1 ?
                                        <p className='card__content-back'>{contentBack}</p>
                                        :
                                        ''
                                    }
                                </div>
                            </div>

                            <div className='share-content__socials'>
                                <div>
                                    <img src={InstaIcon} alt='instagram' />
                                    <p>its.nomoreboredom</p>
                                </div>
                                <div>
                                    <img src={FbIcon} alt='facebook' />
                                    <p>No More Boredom</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='share-content__share'>
                        {id > 1 &&
                            <button className='share-content__download' onClick={() => onBack()} >
                                <img src={BackIcon} alt="back" />
                            </button>
                        }
                        <button onClick={saveImage} className='share-content__download'>
                            <img src={DownloadIcon} alt="dowload" />
                        </button>
                        {isRotated &&
                            <button onClick={switchSide} className='share-content__download'>
                                <img src={RotateIcon} alt="rotate" />
                            </button>
                        }
                        <button className='share-content__download' onClick={() => onNext()} >
                            <img src={NextIcon} alt="next" />
                        </button>
                    </div>
                </>
                :
                <>
                    <div className='share-content__title'>Share</div>
                    <div className='share-content__share'>
                        <FacebookShareButton url={url} quote={title}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <LinkedinShareButton url={url} quote={title}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <RedditShareButton url={url} quote={title}>
                            <RedditIcon size={32} round />
                        </RedditShareButton>
                        <TelegramShareButton url={url} quote={title}>
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <TwitterShareButton url={url} quote={title}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <WhatsappShareButton url={url} quote={title}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                </>
            }
        </div>
    )
}

export default ShareContent