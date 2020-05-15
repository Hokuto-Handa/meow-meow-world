import React from 'react';

import FeedbackIcon from '@material-ui/icons/Feedback';
import ErrorIcon from '@material-ui/icons/Error';
import { orange } from '@material-ui/core/colors';

import { Head1, Head2, Head3, FormPaper } from './child';

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
           AWSのEC2コンテナにデプロイしています(ECSを使用)。画像の保存にはAWSのS3を、データベースにはAWSのRDSを使用しました。<br/>
           環境の構築はDockerで行っています。<br/>
           また、フロントエンドにはReact・Reduxを、バックエンドはPHP用いて作成しました。<br/>
          </p>
          <Head2><FeedbackIcon />About Me</Head2>
          <p>
            ウェブ系のエンジニア志望です。学習内容はJavaScript(React), PHP, Swiftなど。<br/>
            ポートフォリオサイトは<a href="https://hokuto-handa.github.io/my-portfolio/">こちら</a>。
          </p>
          <Head3><ErrorIcon style={{ color: orange[500] }} />Attention</Head3>
          <p>
            不定期で、データベースの初期化等の作業をします。<br/>
            投稿内容が反映されない場合は時間を置いてお試しください。
          </p>
        </FormPaper>
      </main>
    </div>
  );
}

export default About;
