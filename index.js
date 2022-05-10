let operators = []; //stores the operators.
let opCount = 0; //counts the number of operators.
let inputDisplay = "";

let displayIn = document.getElementById("input-el");
let displayOut = document.getElementById("result-el");

let copyOfIn,num1,num2,pos,ruleBODMAS,value; //variables for "=" clause in main function.
let ops = []; // Stores the operators;
let spdex = []; //Stores the index numbers of white in a text.
let i,j,k; //Loop variables.

function main(val)
{
  if(val>=0 && val<=9)
  {
    inputDisplay += val;
    displayIn.textContent = inputDisplay;
  }
  if(val=="=")
  {
    ruleBODMAS = "/*+";
    copyOfIn = inputDisplay;
    ops = [...operators];
    /*
      Copies of the original values are made so that all changes are done locally within the main function without affecting the orignal data. 

      Also any further change in the "input" string by the user can be smoothly processed without making the user to re-input everything from the beginning.
    */
    
    copyOfIn = copyOfIn.replaceAll("/"," ");
    copyOfIn = copyOfIn.replaceAll("*"," ");
    copyOfIn = copyOfIn.replaceAll("+"," ");
    copyOfIn = copyOfIn.replaceAll("-"," ");
    copyOfIn = " " + copyOfIn + " ";
    /*
      Replacing all the operators with spaces makes it super easy to navigate the entire string of "input" for extraction of operands and conduct the required operation.
        
      Spaces are added at both ends of the string so that it helps in the navigation of the string as mentioned above.
    */
    
    for(i=0; i<3; i++)
    {
      // console.log("i:",i);
      // console.log("copyOfIn:",copyOfIn);
      // console.log("Ops:",ops);
      // console.log("Operators:",operators);
      for(j=0; j<ops.length; j++)
      {   
        if(ruleBODMAS[i]==ops[j] || i==2)
        {
          // console.log("j:",j);
          // console.log("copyOfIn:",copyOfIn);
          spaceCounter(copyOfIn);
          /*
            spaceCounter funcition counts and stores the index numbers of the white spaces in array "spdex[]".
          */
          pos = (i==2)?1:(j+1);
          /*
            variable "pos" stores the current position of the operator.

            It's variable in case of "/" & "*" operators, while for "+" & "-" its assigned 1 as the operations are conducted linearly i.e. first come first basis.
          */
          
          textOfnum1 = copyOfIn.substring(spdex[pos-1]+1,spdex[pos]);
          textOfnum2 = copyOfIn.substring(spdex[pos],spdex[pos+1]);
          /*
            Using "spdex[pos]" we locate the position of the required operator in the "input" string and then we locate the previous location of whitespace using "spdex[pos-1]".

            For the 1st & 2nd operand we use "spdex[pos-1]+1" and "spdex[pos+1]" respectively.

            Now we extract the number and convert it to float type for operating it.
          */ 
          num1 = parseFloat(textOfnum1);
          num2 = parseFloat(textOfnum2);

          if(isNaN(num1)) num1 = 0;
          if(isNaN(num2)) num2 = 0;
          /*
            On certain occassions the input might be like "+25" or "78-" where there number of operands and operator is same; then we assign the unassigned variables with "0" so that the operation can be done otherwise it will result into an error.
          */
          // console.log("nums:",num1,num2);
          value = (i==2)?result(ops[0]):result(ruleBODMAS[i]);
          // value = isNaN(value)?"error":value; 

          // console.log("value:",value);
          replaceText = copyOfIn.substring(spdex[pos-1]+1,spdex[pos+1]);
          copyOfIn = copyOfIn.replace(replaceText,value);
          /*
            After the operation is done and the result is stored, the operands & operator is removed from the copy of "input" string.
          */
          spdex.length = 0;
          ops.splice(j,1);
          i--; // So that we don't miss any operator.
        }
        // console.log("opCount:",opCount);
      }
      // console.log("--------");
    }
    displayOut.textContent = "Result: "+copyOfIn;
    // console.log("****************");
  }
}

function spaceCounter(val)
{
  for(m=0,n=0; m<val.length; m++)
  {
    if(val.substring(m,m+1)==' ') spdex[n++] = m;
  }
}

function clearData(val)
{
  if(val=='C')
  {
    last_input = inputDisplay.slice(-1);
    if(last_input==operators[opCount-1]) 
    {
      operators.pop();
      opCount--;
    }
    inputDisplay = inputDisplay.substring(0,inputDisplay.length-1);        
  }
  else if(val=='AC')
  {
    // Everything is reset.   
    inputDisplay = "";
    opCount = 0;
    operators.length = 0;
    ops.length = 0;
    displayOut.textContent = "Result: ";
  }
  displayIn.textContent = inputDisplay;
}

function result(operation)
{
  switch(operation)
  {
    case '+': return (num1+num2); break;
    case '-': return (num1-num2); break;
    case '/': return (num1/num2); break;
    case '*': return (num1*num2); break;
  }    
}

function operator(val)
{
  last_input = inputDisplay.slice(-1);
  if(last_input>='0' && last_input<='9')
  {
    operators.push(val);
    opCount++;
    inputDisplay += val;
    displayIn.textContent = inputDisplay;
  }
  else if(last_input=='');
  
  else 
  {
    operators[opCount-1] = val;
    inputDisplay = inputDisplay.substring(0,inputDisplay.length-1)+val;
    displayIn.textContent = inputDisplay;
  }
  // console.log("opCount:",opCount);
  // console.log("operators:",operators);
  // console.log("/////////////////////");
}
