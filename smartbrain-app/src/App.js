
import React, {Component} from "react";

import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import ParticlesBg from 'particles-bg'

//IMPLEMENTANDO LA API CLARIFAI

const returnClarifaiRequestOptions = (imageUrl) => {
     // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '27458fd0968f4c9389e967cb8b25f1f2';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'agustinbie';       
    const APP_ID = 'my-first-application-6z9ih';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;
}
    

  

    

class App extends Component {
  constructor (){
    super();
    this.state = {
      input: "",
      imageUrl:"",
    }
  }




   onInputChange = (e) => {
    console.log(e.target.value);
    this.setState({input: e.target.value})


  }

  onButtonSubmit = () => {
    console.log("click");
    this.setState({imageUrl: this.state.input})

//https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F220616144714-tom-hanks-file-053122.jpg
// iria como parametro de returnClarifaiRequestOptions una url de una imagen para que el fetch post no de error, el this.state.input está vacio 
    fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions(this.state.input))
        .then(response => response.json())
        .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
        .catch(error => console.log('error', error));
  }

render() {
  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true}  />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
       <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
  }
}

export default App;
