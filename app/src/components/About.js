import React from 'react';

import Paper from '@material-ui/core/Paper';

import { Head1 } from './child';

function About() {
  return(
    <div>
      <header>
        <Head1>About</Head1>
      </header>
      <main>
        <Paper>
          <p>
            このアプリは、・・・・・
          </p>
        </Paper>
      </main>
    </div>
  );
}

export default About;
