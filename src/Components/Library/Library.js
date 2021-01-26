import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Library() {
  const history = useHistory();
  useEffect(() => {
    history.push('/collection/playlists');
  }, [history]);
  return null;
}

export default Library;