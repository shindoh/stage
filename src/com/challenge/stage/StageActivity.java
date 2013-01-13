public class NotifyService extends Service{
    private final int NOTI_ID=1;
	private ConditionVariable condValue;
	private NotificationManager nm;
	
	@Override
	public void onCreate() {
		Log.e("onCreate","check");
		nm = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
		
		condValue = new ConditionVariable(false);
		Thread thread= new Thread(null, run, "notify");
		thread.start();
		super.onCreate();
	}
	
	
	
	Runnable run = new Runnable() {
		
		@Override
		public void run() {
			for(int i = 0 ; i < 4 ; i++)
			{
				showNotification("테스트 1");
				Log.e(i+"번째 ","테스트1");
				if(condValue.block(3*1000))		//pause
					break;
				showNotification("테스트 2");
				Log.e(i+"번째 ","테스트2");
				if(condValue.block(3*1000))
					break;
				showNotification("테스트 3");
				Log.e(i+"번째 ","테스트3");
				if(condValue.block(3*1000))
					break;
				
			}
			
			NotifyService.this.stopSelf();
			
		}
	};
	
	@SuppressLint("NewApi")
	private void showNotification(String text)
	{
		Notification notify = new Notification();
		notify.icon = R.drawable.ic_launcher;
		notify.tickerText = text;
		notify.when = System.currentTimeMillis();
		PendingIntent pendingIntent = PendingIntent.getActivity(getApplicationContext(), 0, new Intent(getApplicationContext(),MainActivity.class), 0);
		notify.setLatestEventInfo(getApplicationContext(), "테스트", text, pendingIntent);
		
		nm.notify(NOTI_ID, notify);
	}
	
	
	
	@Override
	public void onDestroy() {
		
		nm.cancel(NOTI_ID);
		condValue.open();
		Log.e("onDestroy","check");
	}
	
	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		Log.e("onStartCommand","check");
		return super.onStartCommand(intent, flags, startId);
	}
	
	@Override
	public IBinder onBind(Intent intent) {
		condValue.open();
		return null;
	}
}

