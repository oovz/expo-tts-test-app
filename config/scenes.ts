import { Scene } from '@/app/types';

export const SCENES: Scene[] = [
  {
    id: 'default',
    title: 'Welcome',
    description: 'Welcome messages for testing TTS',
    sentences: {
      'en-US': [
        'Hello! Welcome to the TTS testing app.',
        'This app allows you to test text-to-speech functionality across different languages.',
        'Select a language, choose a voice, and press play to hear the text spoken.'
      ],
      'zh-CN': [
        '你好！欢迎使用文本转语音测试应用。',
        '这个应用程序允许您测试不同语言的文本转语音功能。',
        '选择一种语言，选择一个声音，然后按播放键听取文本朗读。'
      ],
      'zh-TW': [
        '你好！歡迎使用文字轉語音測試應用程式。',
        '這個應用程式允許您測試不同語言的文字轉語音功能。',
        '選擇一種語言，選擇一個聲音，然後按播放鍵聽取文字朗讀。'
      ],
      'ja-JP': [
        'こんにちは！TTSテストアプリへようこそ。',
        'このアプリでは、さまざまな言語でのテキスト読み上げ機能をテストできます。',
        '言語を選択し、音声を選び、再生ボタンを押すと、テキストが音声で読み上げられます。'
      ]
    }
  },
  {
    id: 'greetings',
    title: 'Greetings',
    description: 'Common greeting phrases',
    sentences: {
      'en-US': [
        'Hello, how are you today?',
        'Good morning! It\'s a beautiful day.',
        'Welcome to our text-to-speech testing app.'
      ],
      'zh-CN': [
        '你好，今天过得怎么样？',
        '早上好！今天是个美好的一天。',
        '欢迎使用我们的文本转语音测试应用。'
      ],
      'zh-TW': [
        '你好，今天過得怎麼樣？',
        '早安！今天是個美好的一天。',
        '歡迎使用我們的文字轉語音測試應用程式。'
      ],
      'ja-JP': [
        'こんにちは、今日の調子はどうですか？',
        'おはようございます！素晴らしい一日ですね。',
        '私たちの音声合成テストアプリへようこそ。'
      ]
    },
    tags: ['basic', 'common']
  },
  {
    id: 'weather',
    title: 'Weather',
    description: 'Weather-related phrases',
    sentences: {
      'en-US': [
        'Today will be sunny with a high of 75 degrees.',
        'There is a 30% chance of rain this afternoon.',
        'The forecast shows clear skies throughout the week.'
      ],
      'zh-CN': [
        '今天将会是晴天，最高气温24度。',
        '今天下午有30%的降雨概率。',
        '天气预报显示本周都将是晴朗的天空。'
      ],
      'zh-TW': [
        '今天將會是晴天，最高氣溫24度。',
        '今天下午有30%的降雨機率。',
        '天氣預報顯示本週都將是晴朗的天空。'
      ]
    },
    tags: ['nature', 'common']
  }
];