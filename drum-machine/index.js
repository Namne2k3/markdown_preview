class Monitor extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h5>{this.props.text}</h5>
            </div>
        );
    }
}
class Image extends React.Component {
    constructor(props) {
        super(props) ; 
    }
    render(){
        const url = 'https://th.bing.com/th/id/OIP.Gq2f3tbW3mqaSSet_aMogQHaEo?pid=ImgDet&rs=1';
        return (
            <>
                {/* or use requite in file assets */}
                <img alt="a image of drum machine" src={url}>
                </img>
            </>
        );
    }
}
class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            bank:'',
            progress:'',
            power: false
        }
        this.handleClickNumPad = this.handleClickNumPad.bind(this);
        this.handleClickPowerBtn = this.handleClickPowerBtn.bind(this);
        this.handleClickBankBtn = this.handleClickBankBtn.bind(this);
        this.handleProgessBar = this.handleProgessBar.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleClickPowerBtn(e) {

        // toggle power button
        this.setState({
            power: !this.state.power
        })
        if ( document.getElementById(`selected-power`).classList.contains('float-right') ) {
            document.getElementById('selected-power').classList.remove('float-right');
        }
        else {
            document.getElementById('selected-power').classList.add('float-right');
        }     
    }
    handleClickBankBtn(e) {
        if ( document.getElementById(`selected-bank`).classList.contains('float-right') )
            document.getElementById('selected-bank').classList.remove('float-right');
        else {
            document.getElementById('selected-bank').classList.add('float-right');
        }     
    }
    handleClickNumPad(e) {
        console.dir(document.getElementById(e.target.innerText));
        if ( this.state.power ) {
            document.getElementById(e.target.innerText).play() ;
            this.setState({
                text: e.target.id,
                bank:'',
                progress:''
            });
        }
    }
    handleProgessBar(e) {
        const arrayAudio = document.getElementsByClassName('clip') ;
        let newArr = [...arrayAudio];

        newArr.forEach( item => {
            item.volume = (e.target.value/100)
        })
        this.setState({
            text:'',
            bank:'',
            progress: e.target.value
        })
    }
    handleKeyPress() {
        if ( this.state.power ) {
            addEventListener('keypress' , (e) => {
                document.getElementById(e.key.toUpperCase()).play();
                console.log(document.getElementById(e.key.toUpperCase()).parentElement.id);
                this.setState({
                    text: document.getElementById(e.key.toUpperCase()).parentElement.id,
                    progress: ''
                })  
            })
        }
    }
    render() {

        this.handleKeyPress();
        return(
            <div id="drum-machine">
            <div id="logo">
                <strong>
                    FCC
                </strong>
                <i className="fa-brands fa-free-code-camp"></i>
            </div>
            <div id="display">
                <div id="nums" className="col-md-7">
                    <ul id="board-num" className="row text-center">
                        <li num_value="q" onClick={this.handleClickNumPad} id="Heater 1" className="drum-pad col-md-4">
                            Q
                            <audio type="audio/mpeg" src="./sounds/Heater-1.mp3" id="Q" className="clip"></audio>
                        </li>
                        <li num_value="w" onClick={this.handleClickNumPad} id="Heater 2" className="drum-pad col-md-4">
                            W
                            <audio type="audio/mpeg" src="./sounds/Heater-2.mp3" id="W" className="clip"></audio>
                        </li>
                        <li num_value="e" onClick={this.handleClickNumPad} id="Heater 3" className="drum-pad col-md-4">
                            E
                            <audio type="audio/mpeg" src="./sounds/Heater-3.mp3" id="E" className="clip"></audio>
                        </li>
                        <li num_value="a" onClick={this.handleClickNumPad} id="Heater 4" className="drum-pad col-md-4">
                            A
                            <audio type="audio/mpeg" src="./sounds/Heater-4_1.mp3" id="A" className="clip"></audio>
                        </li>
                        <li num_value="s" onClick={this.handleClickNumPad} id="Clap" className="drum-pad col-md-4">
                            S
                            <audio type="audio/mpeg" src="./sounds/Heater-6.mp3" id="S" className="clip"></audio>
                        </li>
                        <li num_value="d" onClick={this.handleClickNumPad} id="Open-HH" className="drum-pad col-md-4">
                            D
                            <audio type="audio/mpeg" src="./sounds/Dsc_Oh.mp3" id="D" className="clip"></audio>
                        </li>
                        <li num_value="z" onClick={this.handleClickNumPad} id="Kick-n'-Hat" className="drum-pad col-md-4">
                            Z
                            <audio type="audio/mpeg" src="./sounds/Kick_n_Hat.mp3" id="Z" className="clip"></audio>
                        </li>
                        <li num_value="x" onClick={this.handleClickNumPad} id="Kick" className="drum-pad col-md-4">
                            X
                            <audio type="audio/mpeg" src="./sounds/RP4_KICK_1.mp3" id="X" className="clip"></audio>
                        </li>
                        <li num_value="c" onClick={this.handleClickNumPad} id="Closed-HH" className="drum-pad col-md-4">
                            C
                            <audio type="audio/mpeg" src="./sounds/Cev_H2.mp3" id="C" className="clip"></audio>
                        </li>
                    </ul>
                </div>
                <div id="controls" className="col-md-5">
                    <div onClick={this.handleClickPowerBtn} id="power-btn">
                        <h5>Power</h5>
                        <div id="power" className="panel">
                            <div id="selected-power" className="selected"></div>
                        </div>
                    </div>
                    <div id="monitor">
                        { this.state.text != '' && <Monitor text={this.state.text}/> }
                        { this.state.progress != '' && <Monitor text={`Volume: ${this.state.progress}`}/> }
                        { this.state.bank != '' && <Monitor text={this.state.bank}/> }
                    </div>
                    <div className="progress" id="progress-bar">
                        <input onChange={this.handleProgessBar} className="vol-bar" type="range" id="vol" name="vol" min="0" max="100"></input>
                    </div>
                    <div onClick={this.handleClickBankBtn} id="bank-btn">
                        <h5>Bank</h5>
                        <div id="bank" className="panel">
                            <div id="selected-bank" className="selected"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Image />
            </div>
        );
    }
}

function App () {
    return (
       <div>
            <DrumMachine />
       </div>
    );
}
ReactDOM.render(
    
        <App/> 
    
, document.getElementById('root'));