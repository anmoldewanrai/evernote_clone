import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

class SidebarComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      addingNote: false,
      title: null
    }
  }

  render(){
    const s = this.state;
    const {notes, classes, selectedNoteIndex} = this.props;
    
    if(notes){
      return <div className={classes.sidebarContainer}>
            <Button
            onClick={this.newNoteBtnClick}
            className={classes.newNoteBtn}
            >{s.addingNote ? 'Cancel' : 'New Note'}</Button>
            {
              this.state.addingNote ? 
              <form onSubmit={this.formSubmit}>
                <input type="text" required
                 className={classes.newNoteInput}
                 placeholder="Enter note title"
                 onKeyUp={e => this.updateTitle(e.target.value.trim())}
                 />
                 <Button
                 disabled={this.state.title ? false : true}
                 className={classes.newNoteSubmitBtn}
                 onClick={this.newNote}
                 >Submit</Button>
              </form> : null
            }
            <List>
              {
                notes.map((note, index) =>{
                  return(
                    <div key={index}>
                      <SidebarItemComponent
                      note={note}
                      index={index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote}>
                      </SidebarItemComponent>
                      <Divider></Divider>
                    </div>
                  )
                })
              }
            </List>
          </div>
    }
    else{
      return <div></div>;
    }
  }

  newNoteBtnClick = () =>{
    this.setState({
      title: null,
      addingNote: !this.state.addingNote
    })
  }

  updateTitle = (text) =>{
    this.setState({
      title: text
    })
  }
 
  newNote = () =>{
   this.props.newNote(this.state.title);
   this.setState({
    addingNote: false,
    title: null
  })
  }

  formSubmit = (e) =>{
    e.preventDefault();
    this.newNote();
  }
  
  selectNote = (note, index) => this.props.selectNote(note, index);

  deleteNote = (note) =>{
    this.props.deleteNote(note)
  }
}

export default withStyles(styles)(SidebarComponent);