import React, { useState } from "react";
import './App.css';
import Header from "./components/Header/Header";
import Keypad from "./components/Keypad/Keypad";
import moon from "./images/moon.png"
import sun from "./images/sun.png"

const usedKeyCodes = [
  48,49,50,51,52,53,54,56,57,96,97,98,99,100,101,102,103,104,105,8,13,190,187,189,191,56,111,106,107,109
];
const numbers = ["0","1","2","3","4","5","6","7","8","9" ];
const operators = ["-","+","*","/"];


function App() {
  const [isDarkMode,setisDarkMode] = useState(false);
  const [expression,setexpression] = useState("");
  const [result,setresult] = useState("");
  const [history,sethistory ] = useState([]);

  const handleKeyPress = (keyCode, Key) =>{

         if(!keyCode) return;
         if(!usedKeyCodes.includes(keyCode)) return;

         if(numbers.includes(Key)){
          if(Key === 0){
            if(expression.length === 0) return ;

          }
          calculateResult(expression + Key);
          setexpression(expression+Key);

         }else if(operators.includes(Key)){
         if(!expression) return;

         const lastChar = expression.slice(-1);


         if(operators.includes(lastChar)) return;
         if(lastChar === ".") return;
         
         setexpression(expression + Key);
         }
         else if(Key === "."){
          if(!expression) return;
          const lastChar = expression.slice(-1);
          if(numbers.includes(lastChar)) return;
          setexpression(expression+Key);
         }
         else if(keyCode === 8){
          if(!expression) return;
          calculateResult(expression.slice(0,-1));
          setexpression(expression.slice(0,-1))
         }
         else if(keyCode === 13){
          if(!expression) return;

           calculateResult(expression);
           const temphistory = [...history];
           if(temphistory.length > 20) temphistory =  temphistory.splice(0,1);
           

           temphistory.push(expression);
           sethistory(temphistory);
         }
        };

          const calculateResult = (exp) => {
            if(!exp) return;
            const lastChar = exp.slice(-1);
            if( !numbers.includes(lastChar)) exp = exp.slice(0,-1);

           const answer = eval(exp).toFixed(2) + "";
            setresult(answer);

          
         


  };
  return (
    <div className="app" 
    tabIndex="0"
    onKeyDown={(event) => handleKeyPress(event.keyCode,event.Key)}
    
    data-theme = {isDarkMode ? "Dark" : ""}>
     <div className="app_calculator">
      <div className="app_calculator_navbar">
      <div className="app_calculator_navbar_toggle"
       onClick={() => setisDarkMode(!isDarkMode)}
      >
      <div className={`app_calculator_navbar_toggle_circle ${
        isDarkMode ? "app_calculator_navbar_toggle_circle_active" : ""
      }`}>
        <img  src = {isDarkMode ? moon : sun} alt="mode"/>
      </div>

      </div>

      </div>
      
      <Header expression = {expression} result = {result} history = {history} />
      <Keypad handleKeyPress = {handleKeyPress}/>
      
      

     </div>
    </div>
  );
}

export default App;
