import axios from 'axios';

// Using free translation API
const TRANSLATION_API_URL = 'https://api.mymemory.translated.net/get';

interface MyMemoryResponse {
  responseData: {
    translatedText: string;
  };
}

interface PinyinData {
  character: string;
  pinyin: string;
  meaning: string;
}

const CHINESE_CHARACTERS = /[\u4e00-\u9fa5]/;

export async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const response = await axios.get<MyMemoryResponse>(TRANSLATION_API_URL, {
      params: {
        q: text,
        langpair: `zh|${targetLang}`,
      },
    });
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return 'Translation service temporarily unavailable';
  }
}

export async function getCharacterDetails(text: string): Promise<PinyinData[]> {
  try {
    // Filter only Chinese characters
    const characters = text.split('')
      .filter(char => CHINESE_CHARACTERS.test(char));

    return characters.map(char => ({
      character: char,
      pinyin: getPinyinForChar(char),
      meaning: getMeaningForChar(char),
    }));
  } catch (error) {
    console.error('Pinyin conversion error:', error);
    return [];
  }
}

// Expanded pinyin data for common characters
const PINYIN_MAP: Record<string, string> = {
  '你': 'nǐ',
  '好': 'hǎo',
  '我': 'wǒ',
  '是': 'shì',
  '在': 'zài',
  '这': 'zhè',
  '那': 'nà',
  '人': 'rén',
  '大': 'dà',
  '小': 'xiǎo',
  '中': 'zhōng',
  '国': 'guó',
  '日': 'rì',
  '月': 'yuè',
  '年': 'nián',
  '时': 'shí',
  '天': 'tiān',
  '地': 'dì',
  '上': 'shàng',
  '下': 'xià',
  '前': 'qián',
  '后': 'hòu',
  '左': 'zuǒ',
  '右': 'yòu',
  '东': 'dōng',
  '西': 'xī',
  '南': 'nán',
  '北': 'běi',
  '家': 'jiā',
  '学': 'xué',
  '生': 'shēng',
  '工': 'gōng',
  '作': 'zuò',
  '来': 'lái',
  '去': 'qù',
  '说': 'shuō',
  '话': 'huà',
  '看': 'kàn',
  '听': 'tīng',
  '写': 'xiě',
  '读': 'dú',
  '吃': 'chī',
  '喝': 'hē',
  '睡': 'shuì',
  '想': 'xiǎng',
  '爱': 'ài',
  '会': 'huì',
  '能': 'néng',
  '有': 'yǒu',
  '没': 'méi',
  '个': 'gè',
  '多': 'duō',
  '少': 'shǎo',
  '新': 'xīn',
  '旧': 'jiù',
  '开': 'kāi',
  '关': 'guān',
};

// Expanded meaning data for common characters
const MEANING_MAP: Record<string, string> = {
  '你': 'you',
  '好': 'good',
  '我': 'I/me',
  '是': 'to be',
  '在': 'at/in',
  '这': 'this',
  '那': 'that',
  '人': 'person',
  '大': 'big',
  '小': 'small',
  '中': 'middle',
  '国': 'country',
  '日': 'sun/day',
  '月': 'moon/month',
  '年': 'year',
  '时': 'time',
  '天': 'sky/day',
  '地': 'earth/ground',
  '上': 'up/above',
  '下': 'down/below',
  '前': 'front',
  '后': 'back/after',
  '左': 'left',
  '右': 'right',
  '东': 'east',
  '西': 'west',
  '南': 'south',
  '北': 'north',
  '家': 'home/family',
  '学': 'study/learn',
  '生': 'life/raw',
  '工': 'work',
  '作': 'do/make',
  '来': 'come',
  '去': 'go',
  '说': 'speak/say',
  '话': 'words/speech',
  '看': 'look/see',
  '听': 'listen',
  '写': 'write',
  '读': 'read',
  '吃': 'eat',
  '喝': 'drink',
  '睡': 'sleep',
  '想': 'think/want',
  '爱': 'love',
  '会': 'can/will',
  '能': 'able/can',
  '有': 'have',
  '没': 'not have',
  '个': 'individual/measure word',
  '多': 'many/much',
  '少': 'few/little',
  '新': 'new',
  '旧': 'old',
  '开': 'open',
  '关': 'close',
};

function getPinyinForChar(char: string): string {
  return PINYIN_MAP[char] || '(unknown)';
}

function getMeaningForChar(char: string): string {
  return MEANING_MAP[char] || '(unknown)';
}