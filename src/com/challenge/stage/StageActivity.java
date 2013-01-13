public class MainActivity extends Activity {

	private Button startBtn;
	private Button stopBtn;
	private Button conditonOpenBtn;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		startBtn = (Button)findViewById(R.id.notifycationStart);
		stopBtn = (Button)findViewById(R.id.notifycationStop);
		conditonOpenBtn = (Button)findViewById(R.id.conditionOpen);
		
		startBtn.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				startService(new Intent(getApplicationContext(),NotifyService.class));
				
			}
		});
		
		stopBtn.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				stopService(new Intent(getApplicationContext(),NotifyService.class));
				
			}
		});
		
		conditonOpenBtn.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				bindService(new Intent(getApplicationContext(),NotifyService.class), conn, 0);
				
			}
		});
		
		
	}

	ServiceConnection conn= new ServiceConnection() {
		
		@Override
		public void onServiceDisconnected(ComponentName name) {
			// TODO Auto-generated method stub
			
		}
		
		@Override
		public void onServiceConnected(ComponentName name, IBinder service) {
			Log.e("onServiceConnected","check");
		
		}
	};
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.activity_main, menu);
		return true;
	}

}
