@SuppressLint("NewApi")
	private void showNotification(String text)
	{
		PendingIntent pendingIntent = PendingIntent.getActivity(getApplicationContext(), 0, new Intent(getApplicationContext(),MainActivity.class), 0);
		Notification notify = new Notification();
		
		try {
			Object notifyBuilder = Class.forName("android.app.Notification.Builder").getConstructor(new Class[]{Context.class}).newInstance(this);
			Method setTickerMethod = notifyBuilder.getClass().getMethod("setTicker", new Class[]{CharSequence.class});
			setTickerMethod.invoke(notifyBuilder, text);
			
			Method setSmallIconMethod = notifyBuilder.getClass().getMethod("setSmallIcon", new Class[]{int.class});
			Method setLargeIconMethod = notifyBuilder.getClass().getMethod("setLargeIcon", new Class[]{int.class});
			Method setWhenMethod = notifyBuilder.getClass().getMethod("setWhen", new Class[]{long.class});
			Method setContentTitleMethod = notifyBuilder.getClass().getMethod("setContentTitle", new Class[]{CharSequence.class});
			Method setContentTextMethod = notifyBuilder.getClass().getMethod("setContentText", new Class[]{CharSequence.class});
			Method setContentIntentMethod = notifyBuilder.getClass().getMethod("setContentIntent", new Class[]{PendingIntent.class});

			setSmallIconMethod.invoke(notifyBuilder, R.drawable.ic_launcher);
			setLargeIconMethod.invoke(notifyBuilder, R.drawable.ic_launcher);
			setWhenMethod.invoke(notifyBuilder, System.currentTimeMillis());			
			setContentTitleMethod.invoke(notifyBuilder, text);
			setContentTextMethod.invoke(notifyBuilder, text);
			setContentIntentMethod.invoke(notifyBuilder, pendingIntent);
			
		} catch (Exception e) {
			
			notify.icon = R.drawable.ic_launcher;
			notify.tickerText = text;
			notify.when = System.currentTimeMillis();

			notify.setLatestEventInfo(getApplicationContext(), "테스트", text, pendingIntent);
			
			
			e.printStackTrace();
		}
		
		startForeground(NOTI_ID, notify);
		
//		nm.notify(NOTI_ID, notify);
	}
	
