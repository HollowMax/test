import { useState } from 'react';
import { LeftSide } from './LeftSide/LeftSide';
import { RightSide } from './RightSide/RightSide';

function App() {
  const [link, setLink] = useState(null);

  const itemClick = link => setLink(link);

  return (
    <div className="BaseContainer">
      <LeftSide itemClick={itemClick} />
      <RightSide link={link} />
    </div>
  );
}

export default App;
