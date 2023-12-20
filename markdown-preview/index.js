marked.setOptions({
    breaks: true 
})
const renderer = new marked.Renderer();
class Previewer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isExpand: false,
        }
        this.handleToggleExpand = this.handleToggleExpand.bind(this);
    }
    handleToggleExpand() {
        // console.log(this.props.text)
        this.setState({
            isExpand: !this.state.isExpand
        })
        if ( !this.state.isExpand ) {
            document.getElementById('container-2').classList.add('maximized')
        } else {
            document.getElementById('container-2').classList.remove('maximized')
        }
    }
    render(){
        return(
            <div id="container-2" className="container-2">
                <div id="toolbar">
                    <div id="logo_title">
                        <div id='logo'><i className="fa-brands fa-free-code-camp"></i></div>
                        <strong>Preview</strong>
                    </div>
                    <button onClick={this.handleToggleExpand} className="close-btn">
                        { this.state.isExpand 
                            ? <i className="fa-solid fa-down-left-and-up-right-to-center"></i> 
                            : <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                        }
                    </button>
                </div>
                <div id="preview-text"
                    dangerouslySetInnerHTML={{
                        __html: marked((this.props.messages),{renderer: renderer}),
                    }}
                >
                </div>
                {/* <Markdown>{this.props.messages}</Markdown> */}
            </div>
        );
    }
}
class MarkDown_Previewer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input:'',
            messages:'',
            isExpand: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleExpand = this.handleToggleExpand.bind(this);
    }
    handleToggleExpand() {
        this.setState({
            isExpand: !this.state.isExpand
        })
        if ( !this.state.isExpand ) {
            document.getElementById('container-1').classList.add('maximized')
            document.getElementById('container-2').classList.add('display-none')
        } else {
            document.getElementById('container-2').classList.remove('display-none')
            document.getElementById('container-1').classList.remove('maximized')
        }
        
    }
    handleChange(event) {
        this.setState({
            input: event.target.value, 
            messages: event.target.value
        })
    }
    render() {
        return(
            <React.Fragment>
                <div id="container-1" className="containter-1">
                    <div className="" id="toolbar">
                        <div id="logo_title">
                            <div id='logo'><i className="fa-brands fa-free-code-camp"></i></div>
                            <strong>Editor</strong>
                        </div>
                        <button onClick={this.handleToggleExpand} className="close-btn">
                            { this.state.isExpand 
                                ? <i className="fa-solid fa-down-left-and-up-right-to-center"></i> 
                                : <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                            }
                        </button>
                    </div>
                    <div className="" id="editor">
                        <textarea value={this.state.input} onChange={this.handleChange} id="text-area">
                            
                        </textarea>
                        {/* <h2>
                            {this.state.messages}
                        </h2> */}
                    </div>
                </div>
                <Previewer messages={this.state.messages}/>
                <h3 id="author" className="text-center">
                    <i id="author-icon" className="fa-brands fa-neos"></i>
                    Re-create by Namne
                </h3>
            </React.Fragment>

        );
    }
}


function App() {
    return(
        <div>
            <MarkDown_Previewer />
        </div>
    );
}
ReactDOM.render(<App/> , document.getElementById('root'))