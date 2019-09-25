import Head from 'next/head'
import node from 'prop-types'

function Layout({ children }) {
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>
            <div className={'container'}>
                <div className={'flex-item__grow'}></div>
                <div className={'flex-item'}>
                    {children}
                </div>
                <div className={'flex-item__grow'}></div>
            </div>
            <style jsx global>{`
        body {
            background-color: white;
        }
        
        .button {
            background-color: pink;
            padding: 20px;
            margin: 20px;
            text-align: center;
            border: none;
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
    );
}

Layout.propTypes = {
    children: node.isRequired
}

export default Layout

