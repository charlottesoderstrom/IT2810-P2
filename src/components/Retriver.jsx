import { Component } from 'react';
let storage = window.sessionStorage;

/*
This component gets the information from the data folder system and stores it in the browsers sessionStorage.
They all got unice key values making it easy to retrive later when main check if the information already
have been fetched from before. Every fetch for both Text and imagen element are stored after fetching here.
*/
class Retriver extends Component {
    constructor (dataTypeList, categoryList) {
        super();
        this.storageStructure(dataTypeList, categoryList);
    }

    /*
    Makes a key for fetching the wanted SVG information. The key starts with type of "Document",
    then current category choose in img radiobutton list, saved in the currentImg in main's state,
    then last with the current tab value also contained in the state of main. This is send forward to fetchImg
    */
    getImg = (element) =>{
        let imgKey = "Image" + element.state.currentImg + element.state.currentTab;
        this.fetchImg(imgKey,element, "Image");
    };

    /*
    Makes a key for fetching the wanted JSON information. The key starts with type of "Document",
    then current category choose in img radiobutton list, saved in the currentImg in main's state,
    then last with the current tab value also contained in the state of main. This is send forward to fetchImg
    */
    getText = (element) =>{
        let textKey = "Text" + element.state.currentText + element.state.currentTab;
        this.fetchText(textKey, element, "Text");
    };

    /*
    Makes the structure for later easy retiring of information already fetched and stored. Every possible key-value, as explained over getText and getImg, gets each a corresponding
    spot in sessionStorage  using the key-value. The value is set to string 'null'
    */
    storageStructure = (dataType, category) => {
        for(let numberOfTabs = 3; numberOfTabs>=0;numberOfTabs--){
            ['Text','Image'].forEach(datatype => category.forEach(category => storage.setItem(datatype + category + numberOfTabs, null)));
        }
    };


    /*
    Using an ajax solution, the fetching happens inside the data folder. By using both tab-, type-, currentText(Category) and currentTab value, the component finds its
    corresponding wanted data. The text is saved as a .json file and img as a .svg.
    The element been the main.js object gets the state theText, who represent the current wanted text on the site, gets stores first after getting fetched and then
    changed in the main.state.theText. This updates the page. If something goes wrong, the catch will get it and prevent a crash of the site.
    */
    async fetchText(key, element, type) {
        console.log("Fetching Text[JSON]");
        try {
            const path = 'data/'+type+'/gallery_'+element.state.currentTab+'/'+element.state.currentText+type+".json";
            const response = await fetch(path);
            const data = await response.json();
            window.sessionStorage.setItem(key, data.data);
            element.setState({theText:data.data});
        }catch (e) {
            console.log('data/'+type+'/gallery_'+element.state.currentTab+'/'+element.state.currentText+type+".json"+"\nStatus: Ikke funnet");

    }}

    /*
    Using an ajax solution, the fetching happens inside the data folder. By using both tab-, type-, currentImg(Category), and currentTab value, the component finds its
    corresponding wanted data. The text is saved as a .json file and img as a .svg.
    The element svg in the render() of main get changed with the innerHtml function since the data is pure SVG code. But first it gets stores after getting fetched and then
    changed. This updates the page. If something goes wrong, the catch will get it and prevent a crash of the site.
    */
    async fetchImg(key, element, type) {
        console.log("Fetching Image[SVG]");
            try {
                let path = 'data/'+type+'/gallery_'+element.state.currentTab+'/'+element.state.currentImg+type+".svg";
                const response = await fetch(path);
                const data = await response.text();
                window.sessionStorage.setItem(key,data);
                document.getElementById("svg").innerHTML = data;
            }catch (e) {
                console.log('data/'+type+'/gallery_'+element.state.currentTab+'/'+element.state.currentImg+type+".svg"+"\nStatus: Ikke funnet");

            }
        }


}
export default Retriver;