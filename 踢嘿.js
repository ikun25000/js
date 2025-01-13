import plugin from '../../lib/plugins/plugin.js';
//作者：菜狗
//博客：
//QQ群：
//GitHub：
export class Plugin extends plugin {
  constructor() {
    super({
      name: '踢黑',
      dsc: '踢了',
      event: 'message',
      priority: 500,
      rule: [
        {
          reg: /^#?踢黑\s*(\d+)?$/,
          fnc: 'kicknb',
          permission: 'master'
        }
      ]
    });
  }

 
  async kicknb(e) {
    const match = e.msg.match(/^#?踢黑\s*(\d+)?$/); 
    const qqNumber = match[1];

    if (!qqNumber) {
      await e.reply('请在后面输入任意QQ号');
      return;
    }

    if (e.group.pickMember(Number(qqNumber)).is_admin || e.group.pickMember(Number(qqNumber)).is_owner) {
            e.reply(`我无法对小嘿壳或大嘿壳进行操作`)
            return;
            }
    
    if (!(e.group.is_admin || e.group.is_owner)) {
      e.reply('❌ 嘿壳非管理员/群主，无法让别人变成嘿壳');
      return;
      }

    try {
      e.reply(segment.text(`✅ 已将「${qqNumber}」踢出群聊并变成嘿壳`));
      e.group.kickMember(`${qqNumber}`,1,1);
    } catch (err) {
      logger.error(`[踢黑] 失败了: ${err.message}`);
      await e.reply('发生错误 请重试');
    }
  }
}