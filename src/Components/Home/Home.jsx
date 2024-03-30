import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "./../../Firebase/Firebase.init";
import { useState } from "react";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider()
const Home = () => {
  const [user, setUser] = useState(null);
  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
    .then(result => {
        setUser(null);
    })
    .catch((err) => {
        console.log(err);
    })
  }
  const handleGitHub = () => {
    signInWithPopup(auth, gitHubProvider)
    .then(result => {
        const user = result.user
        setUser(user)
    })
    .catch(err => {
        console.log(err);
    });
  }
  console.log(user)
  return (
    <div>
     { user ?
     <button onClick={handleSignOut} className="btn btn-secondary">
        Sign out
      </button>
      :
      <>
      <button onClick={handleGoogle} className="btn btn-secondary">
        Google
      </button>
     
      <button onClick={handleGitHub} className="btn btn-secondary">
        GitHub
      </button>
      </>
      }
     { user &&
     <h1>{user?.displayName}</h1>
     }
    </div>
  );
};

export default Home;
