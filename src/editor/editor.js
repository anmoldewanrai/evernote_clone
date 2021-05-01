import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
  constructor(){
    super();
    this.state ={
      text: '', //corresponds to firestore body field
      title: '',
      id: ''
    }
  }

  componentDidMount = () =>{
   
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    })
  }

  componentDidUpdate = () =>{
    if(this.props.selectedNote.id !== this.state.id){
      this.setState({
        text: this.props.selectedNote.body, 
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      })
    }
  }
  
  render(){
    const {classes} = this.props;
    return <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input type="text"
      className={classes.titleInput}
      placeholder="Note title ..."
      value={this.state.title ? this.state.title : ''}
      onChange={e => this.updateTitle(e.target.value)}/>
      <ReactQuill
      value={this.state.text}
      onChange={this.updateBody}
      ></ReactQuill>
    </div>
  }

  //updating text state
  updateBody = async (val) =>{
    await this.setState({text: val});
    this.update(); //invoking database update (firestore)
  };

  updateTitle = async(title) =>{
    await this.setState({title});
    this.update();
  }

  // firestore update
  update = debounce(() =>{
    this.props.noteUpdate(this.state.id,{
      title: this.state.title,
      body: this.state.text
    })
  }, 1500);
}

export default withStyles(styles)(EditorComponent);