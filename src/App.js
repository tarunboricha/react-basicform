import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [entries, updateEntries] = useState([]);

  const url = "https://server-tarunboricha.onrender.com/api/user-list";
  const submitt = () => {
    let namee = document.getElementsByTagName('input')[0].value;
    let emaill = document.getElementsByTagName('input')[1].value;
    let contactt = document.getElementsByTagName('input')[2].value;
    let messagee = document.getElementsByTagName('textarea')[0].value;
    if (namee === '' || emaill === '' || messagee === '') {
      return;
    }
    console.log(namee + emaill + messagee);
    axios.post(url, {
      name: namee,
      email: emaill,
      contact: contactt,
      message: messagee
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    alert('Form is successfully submited');
  }

  const listAllEntries = () => {
    document.getElementById("con").style.display = 'none';
    document.getElementById('table').style.display = 'block';
    document.getElementsByClassName('backtoform')[0].style.display = 'block';
    axios.get(url)
      .then((response) => {
        console.log(response);
        updateEntries(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const backtoForm = () => {
    document.getElementById("con").style.display = 'block';
    document.getElementById('table').style.display = 'none';
    document.getElementsByClassName('backtoform')[0].style.display = 'none';
  }


  return (
    <div className="center">
      <div className="containerr" id="con">
        <form onSubmit={() => { return false; }} >
          <div className="head" style={{ fontWeight: '700' }}>
            Contact Us Form
          </div>
          <div className="name">
            <div className="labl"><label>Name</label></div>
            <div className="inpt"><input type="text" id="name" required /></div>
          </div>
          <div className="email">
            <div className="labl"><label>Email</label></div>
            <div className="inpt"><input type="text" id="email" required /></div>
          </div>
          <div className="contact">
            <div className="labl"><label>Phone Number (Optional)</label></div>
            <div className="inpt"><input type="number" id="contact" /></div>
          </div>
          <div className="message">
            <div className="labl"><label>Message</label></div>
            <div className="inpt"><textarea id="yourMessage" rows="5" required></textarea></div>
          </div>
          <div className="butn">
            <button className="subtbtn" type="submit" onClick={() => submitt()}>Submit</button>
            <button className="clrbtn" type="reset" >Clear</button>
            <button className="chkentbtn" onClick={() => listAllEntries()}>Check the entries</button>
          </div>
        </form>
      </div>
      <div id="table">
        <table border='1|1'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {
              entries.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.contact}</td>
                    <td>{value.message}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div class="backtoform">
            <button style={{width:'100%'}} onClick={() => backtoForm()}>Back to form</button>
      </div>
    </div>
  );
}

export default App;
