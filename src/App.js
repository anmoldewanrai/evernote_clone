import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

// const collection = firebase.firestore().collection('notes');
// console.log(firebase.firestore().collection('notes'));

class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  render() { 
    return ( 
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          newNote={this.newNote} />
        {
          this.state.selectedNote ? 
          <EditorComponent 
          selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate}
        />: null
        }
      </div>
     );
  }

  // Initial fetch firebase docs (notes collection)
  componentDidMount = () =>{
   
    firebase.firestore().collection('notes')
    .onSnapshot( serverUpdate =>{
      const notes = serverUpdate.docs.map( _doc =>{
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      this.setState({notes});
    })
  }

  selectNote = (note, index) => {
    console.log("selectNote ran");
    console.log(note, index);
    this.setState({selectedNoteIndex: index, selectedNote: note});
  }

  noteUpdate = (id, noteObj) =>{
    console.log("noteUpdate ran");
    firebase.firestore().collection('notes').doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  // add new note
  newNote = async(title) =>{

    // create note obj
    const note={
      title,
      body: ''
    };

    // recieve new added note 
    const newFromDB = await firebase.firestore().collection('notes').add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // store newly created note id
    const newId = newFromDB.id;

    // updating notes state
    await this.setState({notes: [...this.state.notes, note]});

    // selecting the new note
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(note => note.id === newId)[0]);
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    })
  }

  deleteNote = (note) =>{
    
    // get index of note to be deleted from notes array
    const noteIndex = this.state.notes.indexOf(note);
    const lastNoteIndex = this.state.notes.length-1;
    console.log(lastNoteIndex, noteIndex);

    // if note to be deleted is the one currently selected
    if(this.state.selectedNoteIndex === noteIndex){
      console.log("selectedNoteIndex === noteIndex");
      console.log(this.state.selectedNoteIndex, noteIndex);
      this.setState({
        selectedNote: null,
        selectedNoteIndex: null
      })
    }

    // if last note is selected but another deleted
    else if(this.state.selectedNoteIndex === lastNoteIndex && noteIndex < lastNoteIndex ){
      console.log("selectedNoteIndex === lastNoteIndex && noteIndex < lastNoteIndex");
      console.log(lastNoteIndex-1);
      this.selectNote(
        this.state.notes[lastNoteIndex-1],
        lastNoteIndex-1
      )
    }

    else if(this.state.selectedNoteIndex > noteIndex){
      console.log("selectedNoteIndex > noteIndex");
      this.selectNote(
        this.state.notes[this.state.selectedNoteIndex-1],
        this.state.selectedNoteIndex-1
      )
    }

    firebase.firestore().collection('notes').doc(note.id).delete();
  }
}

export default App;
