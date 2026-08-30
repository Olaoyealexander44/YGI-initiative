import React from 'react';
import YGIHero from './landingpage';
import MissionVision from './missionpage';
import Media from './mediapage';
import Team from './teampage';

function Home() {
  return (
    <div>
      <YGIHero />
      <MissionVision />
      <Media />
      <Team />
    </div>
  );
}

export default Home;