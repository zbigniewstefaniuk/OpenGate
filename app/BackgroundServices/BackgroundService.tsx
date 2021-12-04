import BackgroundService from 'react-native-background-actions';
import CallDetectorManager from 'react-native-call-detection';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {handleCall} from '../screens/Home';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

class BService {
  constructor() {
    this.Options = {
      taskName: 'Listening for incomming calls',
      taskTitle: 'Listening for incomming calls',
      taskDesc: 'Demo',
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#ff00ff',
      parameters: {
        delay: 5000,
      },
      actions: '["Exit"]',
    };
  }
  async VeryIntensiveTask(taskDataArguments) {
    await new Promise(async resolve => {
      const startListener = () => {
        // eslint-disable-next-line no-new
        new CallDetectorManager(
          async (event: string, number: string) => {
            console.log(
              'Background event -> ',
              event + (number ? ' - ' + number : ''),
            );
            // let updatedCallStates: any;
            // updatedCallStates.push(event + (number ? ' - ' + number : ''));
            // console.log('UPDATED CALL', updatedCallStates);

            // For iOS event will be either "Connected",
            // "Disconnected","Dialing" and "Incoming"

            // For Android event will be either "Offhook",
            // "Disconnected", "Incoming" or "Missed"
            // phoneNumber should store caller/called number

            if (event === 'Disconnected') {
              // Do something call got disconnected
            } else if (event === 'Connected') {
              // Do something call got connected
              // This clause will only be executed for iOS
            } else if (event === 'Incoming') {
              // Do something call got incoming
            } else if (event === 'Dialing') {
              // Do something call got dialing
              // This clause will only be executed for iOS
            } else if (event === 'Offhook') {
              //Device call state: Off-hook.
              // At least one call exists that is dialing,
              // active, or on hold,
              // and no calls are ringing or waiting.
              // This clause will only be executed for Android
            } else if (event === 'Missed' && event !== 'Offhook') {
              // Do something call got missed
              // This clause will only be executed for Android

              BackgroundService.updateNotification({taskDesc: 'Gate opened'});
              RNImmediatePhoneCall.immediatePhoneCall('60261204');
              console.log(handleCall);
              await handleCall();
              console.log('background call missed');
              return 'Missed';
            }
          },
          true, // To detect incoming calls [ANDROID]
          () => {
            // If your permission got denied [ANDROID]
            // Only if you want to read incoming number
            // Default: console.error
            console.log('Permission Denied by User');
          },
          {
            title: 'Phone State Permission',
            message:
              'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
          },
        );
      };
      startListener();
    });
  }
  Start() {
    BackgroundService.start(this.VeryIntensiveTask, this.Options);
  }
  Stop() {
    BackgroundService.stop();
  }
}
const BackgroudService = new BService();
export default BackgroudService;
