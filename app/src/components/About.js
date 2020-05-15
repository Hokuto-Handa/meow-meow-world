import React from 'react';

import FeedbackIcon from '@material-ui/icons/Feedback';

import { Head1, Head2, FormPaper } from './child';

function About() {
  return(
    <div>
      <header>
        <Head1>About</Head1>
      </header>
      <main>
        <FormPaper>
          <Head2><FeedbackIcon />About This App</Head2>
          <p>
            フロントエンドにReact・Reduxを、バックエンドにPHP用いて作成しました。<br/>
            データベースにはMySqlを使用しています。<br/>
            また、環境構築にはDockerを使用し、AWSにて公開しています（予定）。
          </p>
          <Head2><FeedbackIcon />About Me</Head2>
          <p>
            エンジニアに転職するべく学習しています。学習内容はJavaScript(React), PHP, Swiftなど。<br/>
            ポートフォリオサイトは<a href="https://hokuto-handa.github.io/my-portfolio/">こちら</a>。
          </p>
        </FormPaper>
      </main>
    </div>
  );
}

export default About;
