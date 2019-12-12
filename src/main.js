import React, { Component } from "react";
import './index.css';
import Retriver from './components/Retriver.jsx';
import Tab from "./components/Tab";
import Form from "./components/Form";
import SetFavorite from "./components/SetFavorite";
import ViewFavorite from "./components/ViewFavorite";
import MusicPlayer from "./components/MusicPlayer";
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";

let retriever;
let category = ["Comedy", "Romantic", "Horror"];
let dataType = ["Image","Audio","Text"];
let audio;
let fetchedImg,fetchedText, fetchedAudio;

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            theText:" ",
            theImg: null,
            play: false,
            visible: false,
            favorite: {
                img:"",
                audio: "",
                text: "",
            }
        };
        retriever = new Retriver(dataType, category);
    }

    stopAudio = () => {
        if((this.state.currentImg && this.state.currentText && this.state.currentAudio)) {
            for (let i = 1; i < 5; i++) {
                document.getElementById(this.state.currentAudio + i).pause()
            }
            this.setState({play:false});
        }
    };

    handleTabClick = tab => {
        this.stopAudio();
        this.setState({currentTab: tab});
        fetchedImg=null;
        fetchedText=null;

        //this.setState({play:false});
    };

    /* In this function the main component checks which type of media the user has choose in
    the radio buttons. It then sets the state for the value (comedy, horror or romantic)*/
    handleFormChange = (type, value) => {
        if (type==="Image") {
            this.setState({currentImg: value});
        }
        else if (type==="Audio") {
            this.setState({currentAudio: value});
            this.stopAudio();
            
        }
        else if (type==="Text") {
            this.setState({currentText: value});
        }
        else {
            console.log("No matches");
        }
    };

    /* Checks which gallery it's on to know which image it should show */
    handleImgCheckedAtTab = () => {
        //Check if the user is finshed clicking on all the radio buttons for the first time
        if((this.state.currentImg && this.state.currentText && this.state.currentAudio)) {
            if (fetchedImg!==this.state.currentImg){
                this.updateImg();
            }
        }
    };



    /* Checks which gallery it's on to know which audio it should play */
    handleAudioCheckedAtTab = () => {
        //Check if the user is finished clicking on all the radio buttons for the first time
        if(this.state.currentImg && this.state.currentText && this.state.currentAudio) {
            this.showPlayer();
            if (fetchedAudio!==this.state.currentAudio){
                this.stopAudio();
                fetchedAudio=this.state.currentAudio;
            };

            if (this.state.currentTab === 0) {
                return "";
            }
            else if (this.state.currentTab === 1) {

                return "";
            }
            else if (this.state.currentTab === 2) {
                return "";
            }
            else if (this.state.currentTab === 3) {
                return "";
            }
        }
    };

    handleTextCheckedAtTab = () => {
        //Check if the user is finished clicking on all the radio buttons for the first time
        if((this.state.currentImg && this.state.currentText && this.state.currentAudio)) {
            if (fetchedText!==this.state.currentText){
                this.updateText();
                fetchedText=this.state.currentText;
            }
        }
    };

    /* Sets the category combination of the different mediatypes to favorite, if the
    favorite combination isn't already been set. It then saves the combination to localstorage */
    handleSetFavoriteClick = () => {
        if(!(this.state.favorite.img!== "" && this.state.favorite.audio!=="" && this.state.favorite.text!==""))
         {
             if (!(localStorage.getItem("favoriteImg") && localStorage.getItem("favoriteAudio") 
             && localStorage.getItem("favoriteText"))) {
                this.setState({favorite: 
                    {
                        ...this.state.favorite,
                        img: (this.state.currentImg),
                        audio: (this.state.currentAudio),
                        text: (this.state.currentText)
                    }
                }, () => {
                    localStorage.setItem("favoriteImg", this.state.favorite.img)
                    localStorage.setItem("favoriteAudio", this.state.favorite.audio);
                    localStorage.setItem("favoriteText", this.state.favorite.text);
                })
             } 
        }
    };

    /* Fetches the favorite categories and sets the states accordingly to show
    a combination of the favorite categories for the different media types */
    handleViewFavoriteClick = () => {
        const img = localStorage.getItem("favoriteImg"); 
        const audio = localStorage.getItem("favoriteAudio"); 
        const text = localStorage.getItem("favoriteText");
        this.setState({currentImg: img});
        this.setState({currentAudio: audio});
        this.setState({currentText: text});
    };


    /* Retrieves the correct mp3/audio-file from index.HTML*/
    //Evt trenger denne if-setningen en sjekk på tabclick også, og hvis det endres i currentAudio
    changeSong= () => {
        if(this.state.currentImg && this.state.currentText && this.state.currentAudio) {
            audio = document.getElementById(this.state.currentAudio + (this.state.currentTab + 1));
        }
        return audio;
    };


    /* Lets the play-button play of a mp3-file*/
    handleMusicPlayer = () => {
        this.setState({play: !this.state.play}, () => {
            this.state.play ? this.changeSong().play() : this.changeSong().pause();
        });
    };

    updateImg = () => {
        let wantedImg = window.sessionStorage.getItem("Image" + this.state.currentImg + this.state.currentTab);
        if (wantedImg==='null'){
            console.log("[Not in sessionStorage]\tFetching IMG from data ");
            retriever.getImg(this);
        }else{
            console.log("[ In sessionStorage ]\tFetching IMG from storage ");
            document.getElementById("svg").innerHTML = (wantedImg);
        }
        fetchedImg=this.state.currentImg;
    };

    updateText = () => {
        let wantedText = window.sessionStorage.getItem("Text" + this.state.currentText + this.state.currentTab);
        if (wantedText==='null'){
            console.log("[Not in sessionStorage]\tFetching TEXT from data ");
            retriever.getText(this);
        }else{
            console.log("[ In sessionStorage ]\tFetching TEXT from storage ");
            this.setState({theText: wantedText});
        }
        fetchedImg=this.state.currentText;
    };

    /* Hides the play-button until all the radio-buttons is pressed*/
    showPlayer() {
        if (!this.state.visible){
            this.setState({visible:true});
        }
    };

    render(){
        return (
            <div>
                <div><h1>Chown's gallery</h1>
                <Tab onTabClick={this.handleTabClick}/>
                </div>
                <div>

                    <Card>
                        <CardHeader> {this.handleImgCheckedAtTab(this.state.currentImg)}<div id ="svg"></div></CardHeader>

                        <CardBody>{this.handleAudioCheckedAtTab(this.state.currentAudio)}
                            <MusicPlayer visible={this.state.visible} play={this.state.play}
                            togglePlayer={this.handleMusicPlayer} title =
                            {this.state.play ? 'Pause' : 'Play'}/>

                        </CardBody>
                        <CardFooter>{this.handleTextCheckedAtTab(this.state.currentText)}  {this.state.theText} </CardFooter>

                    </Card>
                </div>

                <div className="form-container">
                    <Form handleChange={this.handleFormChange} title="Image" type="Image" options={category} />
                    <Form handleChange={this.handleFormChange} title="Audio" type="Audio" options={category} />
                    <Form handleChange={this.handleFormChange} title="Text" type="Text" options={category} />
                </div>

                <div className="favorite-container">
                    <SetFavorite onSetFavoriteClick = {this.handleSetFavoriteClick}/>
                    <ViewFavorite onViewFavoriteClick = {this.handleViewFavoriteClick}/>
                </div>
            </div>
        );
    }
}

export default Main;
