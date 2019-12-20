import uuid from 'uuid';

function getInitAuthState(add) {
    const egAuthStr = localStorage.getItem('egAuthState');
    if (!egAuthStr) {
      const auth = {
        sec: `sec_${uuid.v1()}`,
        pub: `pub_${uuid.v1()}`,
      };
      localStorage.setItem('egAuthState', JSON.stringify(auth));
    }else {
      if (add) {
        const auth  = Object.assign({}, JSON.parse(egAuthStr), add);      
        console.log('Storing');
        console.log(auth);
        localStorage.setItem('egAuthState', JSON.stringify(auth));
      }
      return JSON.parse(egAuthStr);
    }
  }


  function addAuthHdr(header) {
    const {session, sessionSig} = getInitAuthState();
    
    return Object.assign({}, header, {
        egcookie:`egteam:sess=${session}; egteam:sess.sig=${sessionSig}`,
    });
  }
  export {
      getInitAuthState,
      addAuthHdr,
  }