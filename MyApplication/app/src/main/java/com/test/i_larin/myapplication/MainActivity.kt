package com.test.i_larin.myapplication

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var a: A? = null

        a?.int=4

        Log.e("zzz",""+a?.int)

    }
}

class  A{
    var int: Int? =null


}
