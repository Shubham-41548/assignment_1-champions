import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import './index.css';

class ChampionDetails extends Component {
    state = {
        showModal: false
    };


    handleClose = () => {
        this.props.onPopupClose(false);
    }


    render() {
        const{name,big_image_url,armor,armorperlevel,attackdamage,
            attackdamageperlevel,attackrange,hpperlevel,movespeed,spellblockperlevel} ={...this.props.currentChampion};
        return (
            <Fragment>
                <Modal show={this.props.showModalPopup} onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="sign-in-title">
                        {name} 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <img className='bigImg' src={big_image_url}></img>
                            <span className='champDetails'>
                                <b>armor: </b>{armor}
                                <hr></hr>
                                <b>armorperlevel: </b>{armorperlevel}
                                <hr></hr>
                                <b>attackdamage: </b>{attackdamage}
                                <hr></hr>
                                <b>attackdamageperlevel: </b>{attackdamageperlevel}
                                <hr></hr>
                                <b>attackrange: </b>{attackrange}
                                <hr></hr>
                                <b>hpperlevel: </b>{hpperlevel}
                                <hr></hr>
                                <b>movespeed: </b>{movespeed}
                                <hr></hr>
                                <b>spellblockperlevel: </b>{spellblockperlevel}
                                <hr></hr>
                                <b>armorperlevel: </b>{armorperlevel}
                            </span>
                        </div>
                    </Modal.Body>

                </Modal >
            </Fragment >

        );
    }
}

export default (ChampionDetails);