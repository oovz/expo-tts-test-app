import { Scene } from '@/app/types';

export const SCENES: Scene[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Default messages for testing TTS',
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
      'ja-JP': [
        'こんにちは！TTSテストアプリへようこそ。',
        'このアプリでは、さまざまな言語でのテキスト読み上げ機能をテストできます。',
        '言語を選択し、音声を選び、再生ボタンを押すと、テキストが音声で読み上げられます。'
      ]
    }
  },
  {
    "id": "basic",
    "title": "Basic Phrases",
    "description": "Simple everyday phrases",
    "sentences": {
      "en-US": [
        "Hello, my name is Alex.",
        "I would like to order a cup of coffee.",
        "The museum opens at nine in the morning."
      ],
      "zh-CN": [
        "你好，我的名字是小明。",
        "我想要点一杯咖啡。",
        "博物馆早上九点开门。"
      ],
      "ja-JP": [
        "こんにちは、私の名前はヒロです。",
        "コーヒーを一杯注文したいです。",
        "博物館は朝の9時に開館します。"
      ]
    },
    "tags": ["basic"]
  },
  {
    "id": "punctuation",
    "title": "Punctuation Test",
    "description": "Phrases with various punctuation marks",
    "sentences": {
      "en-US": [
        "Wait, is that really true? I can't believe it!",
        "The movie was great; however, the ending was disappointing.",
        "Items to bring: umbrella, jacket, and gloves (if it's cold)."
      ],
      "zh-CN": [
        "等等，这是真的吗？我简直不敢相信！",
        "这部电影很棒；但是，结局令人失望。",
        "需要带的物品：雨伞、外套和手套（如果天气冷的话）。"
      ],
      "ja-JP": [
        "待って、それは本当ですか？信じられません！",
        "映画は素晴らしかった；しかし、エンディングは残念でした。",
        "持ち物：傘、ジャケット、そして手袋（寒い場合）。"
      ]
    },
    "tags": ["punctuation"]
  },
  {
    "id": "emotion",
    "title": "Emotional Expression",
    "description": "Phrases with different moods and emotional tones",
    "sentences": {
      "en-US": [
        "I'm so excited about our vacation next week!",
        "Unfortunately, I have some bad news to share with you.",
        "Could you please be quiet? I'm trying to concentrate."
      ],
      "zh-CN": [
        "我对我们下周的假期感到非常兴奋！",
        "不幸的是，我有一些坏消息要告诉你。",
        "你能安静一点吗？我正在努力集中精力。"
      ],
      "ja-JP": [
        "来週の休暇がとても楽しみです！",
        "残念ながら、あなたに伝えなければならない悪いニュースがあります。",
        "静かにしていただけますか？集中しようとしています。"
      ]
    },
    "tags": ["emotion"]
  },
  {
    "id": "mixed_language",
    "title": "Mixed Language",
    "description": "Non-English phrases with English words mixed in to test multilingual capability",
    "sentences": {
      "en-US": [
        "I bought a new smartphone yesterday.",
        "Let's meet at the coffee shop after work.",
        "The Wi-Fi password is written on the router."
      ],
      "zh-CN": [
        "我昨天买了一部新的smartphone。",
        "工作后让我们在coffee shop见面。",
        "Wi-Fi密码写在router上。"
      ],
      "ja-JP": [
        "昨日新しいスマートフォンを買いました。",
        "仕事の後でコーヒーショップで会いましょう。",
        "Wi-Fiのパスワードはルーターに書いてあります。"
      ]
    },
    "tags": ["multilingual"]
  },
  {
    "id": "long_sentences",
    "title": "Long Complex Sentences",
    "description": "Extended sentences to test complex phrasing, breath control, and sustained intonation",
    "sentences": {
      "en-US": [
        "Despite the meteorologist's prediction of clear skies throughout the weekend, we decided to pack our rain gear and waterproof boots, which turned out to be a wise decision when an unexpected thunderstorm rolled through the campsite on Saturday evening, forcing everyone to seek shelter in their tents or under the large communal pavilion that had been set up near the lake.",
        "The intricate details of the ancient manuscript, which scholars believe was created sometime during the early 14th century by monks working in a remote monastery in the mountains, reveal a sophisticated understanding of astronomy and mathematics that was far ahead of its time, suggesting that the isolated religious community had access to knowledge that wasn't widely available in medieval Europe.",
        "The new public transportation system, which had been in development for over a decade and cost the city nearly three billion dollars to implement, finally opened to the public last Tuesday, providing residents with a faster, more environmentally friendly way to commute between the suburban residential areas and the downtown business district, though some critics argue that the money could have been better spent addressing other pressing infrastructure needs."
      ],
      "zh-CN": [
        "尽管气象学家预测整个周末都会是晴朗的天空，我们还是决定打包我们的雨具和防水靴，这在周六晚上当一场意外的雷暴席卷营地时证明是一个明智的决定，迫使每个人都在他们的帐篷里或在靠近湖边设立的大型公共亭子下寻求庇护。",
        "这部古代手稿的复杂细节，学者们认为是14世纪早期由在山区偏远修道院工作的僧侣们创作的，揭示了对天文学和数学的深刻理解，这远远超前于当时的水平，表明这个与世隔绝的宗教社区获得了在中世纪欧洲并不广泛流传的知识。",
        "这个新的公共交通系统，历经十多年的开发，耗资近三十亿美元，终于在上周二向公众开放，为居民提供了一种更快速、更环保的方式，在郊区住宅区和市中心商业区之间通勤，尽管一些批评人士认为这笔钱本可以更好地用于解决其他紧迫的基础设施需求。"
      ],
      "ja-JP": [
        "気象学者が週末を通して晴れの予報をしていたにもかかわらず、私たちは雨具と防水ブーツを持っていくことにしました。これは、予期せぬ雷雨が土曜の夕方にキャンプ場を襲い、全員がテントの中や湖の近くに設置された大きな共同パビリオンの下に避難することを余儀なくされたとき、賢明な決断だったことが証明されました。",
        "14世紀初頭に山間の僻地にある修道院で働いていた修道士によって作成されたと学者たちが信じている古代の写本の複雑な詳細は、当時としては非常に先進的な天文学と数学の洗練された理解を明らかにしており、この孤立した宗教的コミュニティが中世ヨーロッパでは広く入手できなかった知識へのアクセスを持っていたことを示唆しています。",
        "10年以上にわたって開発され、市に約30億ドルの費用がかかった新しい公共交通システムが、先週の火曜日についに一般に開放されました。これにより、住民は郊外の住宅地と中心部のビジネス地区の間を通勤するためのより速く、より環境に優しい方法が提供されましたが、一部の批評家はこの資金は他の緊急のインフラ整備のニーズに対応するためにより良く使用できたと主張しています。"
      ]
    },
    "tags": ["long", "advanced"]
  }
];