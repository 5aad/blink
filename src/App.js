import React from 'react';
import './App.css';
import {MDBAnimation,MDBInput} from "mdbreact"
 
class App extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {
      words:[
        'hello, monkey eats banana',
        'monkey ,monkey',
        'world, monkey',
        'set on, fire',
        'write your name'
        ],
    per:['perfect', 'amazing', 'flawless'],
      selectedNote: "",
      
      clickedReady: false,
      spans:"",
      inputWord:'',
      hideReady:false,
      hideReadys:true,
      count:0,
      countsec:0,
      perfect:false,
      inputHidden:true,
      againHidden:true,
      showWord:false,
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
      color:"white",
      tryAgain:false
    }
    this.handleInputWord = this.handleInputWord.bind(this);
  
  }

  handleClick = () => {
   
    setTimeout(() => {
      this.setState({
          showWord:true
      })
    }, 300)
    this.setState({
        clickedReady: true, 
        selectedNote: this.state.words[Math.floor(Math.random() * 
          this.state.words.length)],
        selectedEnd: this.state.per[Math.floor(Math.random() * 
          this.state.per.length)],
        inputHidden:false,
        hideReady:true,
        hideReadys:true,
        perfect:false,
        inputWord:'',
        showWord:false,
        timerOn: true,
        timerTime: this.state.timerTime,
        timerStart: Date.now() - this.state.timerTime
        
    })
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  }

 handleInputWord=(e)=>{ 
   
    if(e.target.value===this.state.selectedNote){
      this.setState({
          perfect:true,
          inputHidden:true,
          inputWord:e.target.value,
          timerOn: false
          
      })
      this.setState({inputWord:e.target.value})
      clearInterval(this.timer);
   }else{
     this.setState({
          againHidden:false,
          inputWord:e.target.value
     })
   }
   
 }
//  handleSubmit=()=>{
//      console.log('pressed')
//      if(this.state.inputWord===this.state.selectedNote){
//         this.setState({
//             perfect:true,
//             inputHidden:true,
            
//         })
//      }else{
//        this.setState({
//          againHidden:false
//        })
//      }
//  }
 handleAgain=()=>{
   var  inc = 200 + this.state.countsec
    setTimeout(() => {
      this.setState({
          showWord:true,
          inputHidden:false
      })
    }, inc)
    this.setState({
        count:this.state.count+1,
        countsec:this.state.countsec+200,
        showWord:false,
        inputHidden:true
    })
 }
 handleTime=(hours,minutes,seconds)=>{
    console.log(hours,minutes,seconds)
 }

resetState=()=>{
  this.setState({
    selectedNote: "",
    clickedReady: false,
    inputWord:'',
    hideReadys:false,
    count:0,
    perfect:false,
    inputHidden:true,
    againHidden:true,
    showWord:false,
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    countsec:0,
    spans:[]
 })
}
  render(){

    const { timerTime } = this.state;
    // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let second = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minute = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    // let hour = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    let inputStyle = {
      color: 'white'
    };
    let inputText=this.state.inputWord.split(" ")
    
    for(var i =0; i < inputText.length; i++){
      if(this.state.selectedNote.includes(inputText[i])===true){ 
           
        if(this.state.inputWord.indexOf(inputText[i]) === this.state.selectedNote.indexOf(inputText[i])){

        inputStyle = {
          color: 'blue'
        };
        }else{

        inputStyle = {
          color: 'yellow'
        };
        }
    }else{

      inputStyle = {
        color: 'white'
      };
    }
    }


  return (
    <>

    <div className="App-header">

        <div className="os-phrases">
              <h2 hidden={this.state.hideReady}><span className="blinking">don't</span> blink</h2>
              <h2 hidden={this.state.hideReady}>you have one job</h2>
              <h2 hidden={this.state.hideReady}>write down what you see</h2>
              <h2 style={{cursor:"pointer"}} onClick={this.handleClick} hidden={this.state.hideReady}>Ready?</h2>
        </div>
        <h2 style={{cursor:"pointer"}} onClick={this.handleClick} hidden={this.state.hideReadys}>Ready?</h2>
        <h1 className="pb-2" style={{position:"absolute" , fontSize: "3.35rem"}} hidden={this.state.showWord}>{this.state.selectedNote}</h1>
        {
          this.state.inputHidden?
          (
            <></>
          ):
          (
            <div >
            <h2 className="count"> {this.state.count} <small>{this.state.countsec/1000}s</small></h2>
            <MDBInput autoFocus style={inputStyle}  value={this.state.inputWord} type="text" onChange={(e)=>this.handleInputWord(e)} size="lg" />
            <h2 className="text-center pt-2" style={{cursor:"pointer"}} onClick={this.handleAgain} hidden={this.state.againHidden}>Again?</h2>
            </div>
          )
        }
       
        {
            this.state.perfect?
            (
              
                <div className="text-center">
                  <MDBInput type="text" style={inputStyle} value={this.state.inputWord} onChange={(e)=>this.handleInputWord(e)} size="lg" />
                  <h2>{this.state.selectedEnd}</h2>
                  <MDBAnimation type="fadeIn" duration="1s" delay="2s">
                  <h2 className="p-2">{this.state.count} flashes, {minute}:{second} Seconds</h2>
                  <h2 style={{cursor:"pointer"}} onClick={this.resetState}>I want more</h2>
                  </MDBAnimation>
                </div>
            ):
            (
                <></>
            )
        }
      </div>
      </>
  );
}
}
export default App;