import { segment } from 'oicq';
import { core } from 'icqq';
import { randomBytes, randomUUID, randomInt } from 'crypto';
import cfg from "../../lib/config/config.js";
import plugin from '../../lib/plugins/plugin.js';
import common from "../../lib/common/common.js";
import puppeteer from "../../lib/puppeteer/puppeteer.js";
import request from "./node_modules/request/index.js";
import fetch from 'node-fetch';

let wait = true;
let lastTriggerTime = 0;
const waitTime = 100000; // 冷却时间，单位为毫秒

export class qqbot extends plugin {
  constructor() {
    super({
      name: 'QQbothack',
      dsc: '查询QQbot',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?查询机器人\s*(\d+)?$/,
          fnc: 'qqbothack'
        }
      ]
    })
  }

  async qqbothack(e) {
  
  const currentTime = Date.now();
    const timeDiff = currentTime - lastTriggerTime;

    if (wait) {
      const remainingTime = waitTime - timeDiff;
      if (remainingTime > 0) {
        this.e.reply(`所有人共享CD，请${Math.ceil(remainingTime / 1000)}秒重试`, true);
        return;
      }
    }

    wait = true;
    lastTriggerTime = currentTime;
  
    const match = e.msg.match(/^#?查询机器人\s*(\d{5,11})?/);
    if (!match || !match[1]) {
      e.reply('格式错误，正确格式：#查询机器人 <QQ号>', true);
      return false;
    }
    
    const qq = parseInt(match[1], 10);

    try {
      const pbda = Bot[3671191904].icqq.core.pb.decodePb((await Bot[3671191904].sendUni("OidbSvcTrpcTcp.0x9075",Bot[3671191904].icqq.core.pb.encode({
    "1": 36981,
    "2": 1,
    "4": {
        "1": qq,
        "2": 0,
        "3": "701418153",
        "5": {
            "1": 1,
            "2": 1
        }
    },
    "12": 1
}))));
  const jjj = JSON.stringify(pbda)
      
      if (pbda[5] === "当前机器人无法分享") {
        e.reply("❌机器人不存在或者被封禁");
        return false;
      }

      const shareurl = pbda[4]?.[11];
      const id = pbda[4]?.[1]?.[15];
      const redu = pbda[4]?.[30]?.[1];
      const haoyou = pbda[4]?.[30]?.[2];
      const qun = pbda[4]?.[30]?.[3];
      const allmsg = pbda[4]?.[30]?.[4];
      const img = `https://q.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=640&img_type=jpg`
      if (!id) {
        e.reply(`❌机器人APPID解析失败,请稍后再试`);
        return false;
      }
      
      const url = `https://qun.qq.com/qunpro/robot/proxy/domain/qun.qq.com/cgi-bin/group_pro/robot/manager/share_info?bkn=2084285276&robot_appid=${id}`;

   const headers = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 15; PJX110 Build/UKQ1.231108.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/135.0.7049.111 Mobile Safari/537.36 V1_AND_SQ_9.1.75_10026_HDBM_T PA QQ/9.1.75.25965 NetType/WIFI WebP/0.4.1 AppId/537287845 Pixel/1080 StatusBarHeight/120 SimpleUISwitch/0 QQTheme/1000 StudyMode/0 CurrentMode/0 CurrentFontScale/0.87 GlobalDensityScale/0.9028571 AllowLandscape/false InMagicWin/0',
  'qname-service': '976321:131072',
  'qname-space': 'Production'
};


  const response = await fetch(url, { method: 'GET', headers });
  
  if (!response.ok) {
    throw new Error(`HTTP错误! 状态码: ${response.status}`);
  }
  
  const data = await response.json();
  
 
  if (!data || !data.data || !data.data.robot_data) {
    throw new Error("返回数据格式不正确，缺少robot_data字段");
  }
  
  const robotData = data.data.robot_data;

  
  const keyMap = {
    robot_uin: "🔢机器人QQ号",
    robot_name: "🔠机器人名字",
    status: "♻️状态",
    robot_desc: "👋机器人介绍",
    call_name: "🚻称呼",
    show_invite: "🔁是否可邀请",
    robot_offline: "💥机器人是否下线",
    verify: "❗验证信息",
    robot_avatar: "🧿机器人头像",
    extra_info: "📋额外信息",
    robot_role: "🫧机器人角色",
    is_gray: "🔓是否内测",
    is_audio: "🔈是否智能体语音",
    mute_status: "🔇禁言状态",
    punishment_status: "⛔处罚状态",
    support_url: "🔗机器人反馈页面链接",
    robot_tid: "®️机器人官方频道ID",
    robot_ban: "📛机器人是否封禁",
    is_sharable: "👁️‍🗨️机器人是否可分享",
    allow_add_other_guild: "🔂是否允许添加至其它频道",
    public_type: "🔄机器人类型",
    appid: "🆔机器人APPID",
    owner_entity: "🕹️拥有者",
    preview_images: "🔎预览图片",
    official_guild: "⛺官方频道",
    tags: "🔳标签",
    robot_status: "🟢机器人运行状态",
    url: "🔗图片地址",
    desc: "💬图片描述"
  };


  const valueMap = {
    status: {
      0: "正常",
      1: "异常"
    },
    robot_status: {
      0: "去火星了",
      1: "未知",
      2: "正常运行",
      3: "封禁状态",
      4: "暂停服务"
    },
    robot_offline: {
      "false": "未下线",
      "true": "被下线"
    },
    is_audio: {
      "false": "否",
      "true": "是"
    },
    show_invite: {
      "false": "否",
      "true": "是"
    },
    is_gray: {
      "false": "否",
      "true": "是"
    },
    is_sharable: {
      "false": "否",
      "true": "是"
    },
    robot_ban: {
      "false": "否",
      "true": "是"
    },
    allow_add_other_guild: {
      "false": "否",
      "true": "是"
    },
    public_type: {
      1: "私域",
      2: "公域"
    }
  };

  
 function formatUrlCase(originalUrl) {
    if (typeof originalUrl !== 'string') return originalUrl;
    
    
    const hostnameRegex = /(https?:\/\/)([^/]+)(\/.*)?/i;
    const match = originalUrl.match(hostnameRegex);
    
    if (match) {
      const [, protocol, hostname, path] = match;
      return protocol + hostname.toUpperCase() + (path || '');
    }
    
    return originalUrl;
  }

  
 function translateAndBeautify(obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => translateAndBeautify(item));
    }
    
    if (obj && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc, key) => {
        const newKey = keyMap[key] || key;
        let value = obj[key];
        
        
        if (['show_invite', 'robot_offline', 'is_gray', 'is_audio', 
             'robot_ban', 'is_sharable', 'allow_add_other_guild'].includes(key)) {
          value = Boolean(value);
        }
        
       
        if (valueMap[key] && valueMap[key][value] !== undefined) {
          value = valueMap[key][value];
        }
        
      
        value = translateAndBeautify(value);
        
       
        if (['robot_avatar', 'support_url'].includes(key) || 
            (key === 'url' && obj.desc !== undefined)) {
          if (typeof value === 'string') {
            value = formatUrlCase(value);
          }
        }
        
        acc[newKey] = value;
        return acc;
      }, {});
    }
    
    return obj;
  }

  
 function formatOutput(data) {
    const jsonStr = JSON.stringify(data, (key, value) => {
      if (value === "") return undefined;
      return value;
    }, 2);
    
 
    return jsonStr
      .replace(/^{\n/, '')       
      .replace(/\n}$/, '')       
      .replace(/^\s+|\s+$/g, ''); 
  }

  const result = translateAndBeautify(robotData);
  const jiben = formatOutput(result);
  
      await e.reply([
  `  \n${jiben}\n`,
  `  "🔥热度"：${redu}\n`,
  `  "💟好友数量"：${haoyou}\n`,
  `  "👨‍👩‍👦‍👦群数量"：${qun}\n`,
  `  "💬消息量"：${allmsg}\n`,
  `  "⏱️ 冷却剩余"：${waitTime/1000}秒`,
  segment.image(img) 
],true,{ recallMsg: 100  });
      

      return true;
    } catch (err) {
      logger.error(err);
      e.reply("查询服务暂时不可用,或者机器人被封");
      return false;
    }
    setTimeout(() => {
      wait = false;
    }, waitTime);
  }
}