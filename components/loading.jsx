import React from 'react';

function Loading() {
  return (
    <div>
      <div className="progress">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <style jsx>
        {`
                .progress span{
                    transition: all 1000ms ease;
                    display: inline-block;
                    animation: wave 1s ease infinite;
                }  
                
                .progress span:nth-child(1){  animation-delay: 0; }
                .progress span:nth-child(2){  animation-delay: 100ms; }
                .progress span:nth-child(3){  animation-delay: 200ms; }
                
                @keyframes wave{
                    0%, 60%, 100% { 
                    transform: translate(0, 0);
                    }
                    30% { 
                    transform: translate(0, -15px); 
                    }  
                }
`}
      </style>
    </div>
  );
}

export default Loading;
