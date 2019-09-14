import Head from 'next/head'
export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
        body {
            background-color: white;
        }
        
        .button {
            background-color: pink;
            padding: 20px;
            margin: 20px;
            text-align: center;
        }
        
        .container {
            display: flex;
        }
        
        .container-column {
            display: flex;
            flex-direction: column;
        }

        .container__align-center {
            align-items: center;
        }
        
        .flex-item {
            flex: auto;
        }
        
        .flex-item__grow {
            flex-grow: 1;
        }
        
        .flex-shrink {
            flex-grow: 0;
        }
        
        .margin {
            margin: 1em;
        }
        
        .margin-top {
            margin-top: 1em;
        }
    `}</style>
  </div>
)