var isPaused : boolean = false; 
var startTime : float; //(in seconds) 
var timeRemaining : float; //(in seconds)
var percent:float;
var clockBG:Texture2D; 
var clockFG:Texture2D;
var clockFGMaxWidth:float; // the starting width of the foreground bar
var rightSide:Texture2D; 
var leftSide:Texture2D; 
var back:Texture2D; 
var blocker:Texture2D; 
var shiny:Texture2D;
var finished:Texture2D;

function Start () {
	//guiText.material.color = Color.black;
	startTime = 120.0;
	clockFGMaxWidth = clockFG.width;
}

function Update () {
	if (!isPaused) {
		// make sure the timer is not paused 
		DoCountdown();
	}
}

function OnGUI() {
	var newBarWidth:float = (percent/100) * clockFGMaxWidth; // this is the width that the foreground bar should be
	var gap:int = 20; // a spacing variable to help us position the clock
	
	var pieClockX:int = 100;
	var pieClockY:int = 50;
	var pieClockW:int = 64; 
	var pieClockH:int = 64;
	var pieClockHalfW:int = pieClockW * 0.5;
	var pieClockHalfH:int = pieClockH * 0.5;

	GUI.BeginGroup (new Rect (Screen.width - clockBG.width - gap, gap, clockBG.width, clockBG.height));
	GUI.DrawTexture (Rect (0,0, clockBG.width, clockBG.height), clockBG);
	GUI.BeginGroup (new Rect (5, 6, newBarWidth, clockFG.height)); 
	GUI.DrawTexture (Rect (0,0, clockFG.width, clockFG.height), clockFG);
	GUI.EndGroup ();
	GUI.EndGroup ();
	
	var isPastHalfway:boolean = percent < 50;
	var clockRect:Rect = Rect(pieClockX, pieClockY, pieClockW, pieClockH);
	var rot:float = (percent/100) * 360;
	var centerPoint:Vector2 = Vector2(pieClockX + pieClockHalfW, pieClockY + pieClockHalfH); 
	var startMatrix:Matrix4x4 = GUI.matrix;
	GUI.DrawTexture(clockRect, back, ScaleMode.StretchToFill, true, 0);
	if(isPastHalfway) {
		GUIUtility.RotateAroundPivot(-rot-180, centerPoint); 
		GUI.DrawTexture(clockRect, leftSide, ScaleMode.StretchToFill, true, 0); 
		GUI.matrix = startMatrix; 
		GUI.DrawTexture(clockRect, blocker, ScaleMode.StretchToFill, true, 0);
	} 
	else { 
		GUIUtility.RotateAroundPivot(-rot, centerPoint); 
		GUI.DrawTexture(clockRect, rightSide, ScaleMode.StretchToFill, true, 0); 
		GUI.matrix = startMatrix;
		GUI.DrawTexture(clockRect, leftSide, ScaleMode.StretchToFill, true, 0);
	}
	if(percent < 0) {
		GUI.DrawTexture(clockRect, finished, ScaleMode.StretchToFill, true, 0);
	} 
	GUI.DrawTexture(clockRect, shiny, ScaleMode.StretchToFill, true, 0);
}
	
function DoCountdown() { 
	timeRemaining = startTime - Time.time;
	percent = timeRemaining/startTime * 100;
	if (timeRemaining < 0) {
		timeRemaining = 0; 
		isPaused = true; 
		TimeIsUp();
	}
	ShowTime();
	Debug.Log("time remaining = " + timeRemaining);
}

function PauseClock() {
	isPaused = true;
}

function UnpauseClock() {
	isPaused = false;
}

function ShowTime() { 
	var minutes : int; 
	var seconds : int; 
	var timeStr : String;
	
	minutes = timeRemaining/60;
	seconds = timeRemaining % 60;
	
	timeStr = minutes.ToString() + ":";
	timeStr += seconds.ToString("D2");
	
	guiText.text = timeStr; //display the time to the GUI
}

function TimeIsUp() { 
	Debug.Log("Time is up!");
}

