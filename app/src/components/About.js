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
          <Head3><ErrorIcon style={{ color: orange[500] }} />Attention</Head3>
          <p>
            就活時は、このアプリをAWSに公開していました。現在はフロントの部分のみを、通常のレンタルサーバーに移して公開しています（AWS利用料を節約するため）。<br/>
            それに伴い画像のアップロード機能等も削除しましたが、当時はデータの投稿・編集・削除ができました。<br/>
            以下の説明は就活時のものです。
          </p>
          <Head2><FeedbackIcon />About This App</Head2>
          <p>
           AWSのEC2コンテナにデプロイしています(ECSを使用)。画像の保存にはAWSのS3を、データベースにはAWSのRDSを使用しました。<br/>
           環境の構築はDockerで行っています。<br/>
           また、フロントエンドにはReact・Reduxを、バックエンドはPHP用いて作成しました。<br/>
          </p>
          <Head2><FeedbackIcon />About Me</Head2>
          <p>
            エンジニア志望です。学習内容はJavaScript(React), PHP, Swiftなど。<br/>
            ポートフォリオサイトは<a href="https://hokuto-handa.github.io/my-portfolio/">こちら</a>。
          </p>
        </FormPaper>
      </main>
    </div>
  );
}

export default About;
