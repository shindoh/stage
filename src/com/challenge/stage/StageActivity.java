package com.challenge.stage;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.view.View;

public class StageActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/app/main.html");

   
        super.appView.setVerticalScrollBarEnabled(true);
        super.appView.setHorizontalScrollBarEnabled(false);
   
        super.appView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);    
    }
}