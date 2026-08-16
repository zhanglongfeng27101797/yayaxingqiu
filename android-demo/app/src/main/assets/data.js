window.YAYA_DATA = (() => {
  const topic = (x) => ({
    art: '', tags: [], creatorFit: '高', creationSpace: '中', difficulty: '简单', crowding: '中',
    medical: '低', platform: '低', safetyNote: '内容仅作经验分享，不替代医生诊断和个体化建议。', ...x
  });

  const topics = [
    topic({
      id: 'sleep', icon: 'moon', art: 'sleep', title: '宝宝睡觉总哼唧、脸憋红，到底正不正常？', category: '0–3月龄',
      structure: '判断解惑', tags: ['判断解惑', '新手友好'], stars: 5, starLabel: '强烈推荐',
      why: '你刚经历过这个阶段，适合用真实观察讲清“先看什么、何时需要就医”。',
      creatorFit: '很高', creationSpace: '大', medical: '中',
      directions: [['判断解惑','按“常见表现—观察信号—就医边界”讲清楚'],['经验复盘','从你当时紧张、后来学会观察切入'],['避坑纠错','纠正“一哼唧就抱、一脸红就是便秘”']],
      keyPoints: ['新生儿睡眠中哼唧、伸展并不少见','先观察呼吸、肤色、吃奶和精神状态','出现持续呼吸困难、发绀、精神反应差等情况应及时就医'],
      hooksByDirection: {
        '判断解惑': [
          ['宝宝睡觉总哼哼唧唧、脸憋得通红，先别急着抱，你先看这3件事。','宝宝睡觉总使劲，不一定就是不舒服，关键看这几个信号。','宝宝一睡着就哼唧，什么情况能观察，什么情况要及时问医生？'],
          ['很多新手妈妈都被宝宝的哼唧声吓到，其实先判断比立刻干预更重要。','宝宝睡着后声音很多，别只盯着“哼唧”，还要看呼吸和精神状态。','这一条讲清：宝宝睡觉脸红使劲，到底该不该马上抱。']
        ],
        '经验复盘': [
          ['我家宝宝刚出生那阵，一睡觉就各种哼唧，我当时真以为他不舒服。','以前宝宝一哼唧我就抱，后来才发现有时候真不用。','那阵子我几乎每晚都被哼唧声叫醒，后来学会先看这几件事。'],
          ['如果回到月子里，我最想告诉自己：先观察，再行动。','我当时为宝宝睡觉使劲跑了好几次医院，后来终于知道该看什么。','新手期最容易紧张的一个声音，就是宝宝睡着后的哼唧。']
        ],
        '避坑纠错': [
          ['宝宝一哼唧就立刻抱起来，是很多新手妈妈最容易踩的坑。','宝宝睡觉使劲，最怕的是所有情况都用同一种办法处理。','看到宝宝脸憋红先别慌，这3个误区很多人都会踩。'],
          ['别再把宝宝每次哼唧都当成肠胀气，先排除这几个信号。','一听见声音就喂奶、拍嗝、抱睡，反而可能打断宝宝睡眠。','宝宝哼唧不是一个结论，别用单一症状自行判断。']
        ]
      }
    }),
    topic({
      id: 'newborn', icon: 'baby', title: '新生儿需要剃胎发吗？很多人都搞错了', category: '新生儿',
      structure: '避坑纠错', tags: ['新生儿', '避坑纠错'], stars: 5, starLabel: '强烈推荐',
      why: '新手家庭常见争议，认知冲突明显，适合用“误区—事实—安全做法”表达。', creatorFit: '高', creationSpace: '中', medical: '低',
      directions: [['避坑纠错','澄清“越剃越浓”等误区'],['判断解惑','回答“需不需要剃、什么时候处理”'],['经验复盘','分享家庭意见不一致时怎么决定']],
      keyPoints: ['胎发浓密主要与遗传和毛囊有关','剃发不能增加毛囊数量','操作时应避免刮伤头皮，异常皮损咨询专业人员']
    }),
    topic({
      id: 'food', icon: 'bowl', art: 'food', title: '第一次加辅食，最容易错在哪？', category: '辅食',
      structure: '流程清单', tags: ['辅食', '流程清单'], stars: 4, starLabel: '值得拍',
      why: '新手添加辅食的高频问题，实用性强，适合清单化表达。', creatorFit: '高', creationSpace: '大', medical: '中',
      directions: [['流程清单','按准备、尝试、观察三步讲'],['避坑纠错','纠正追量、混加、性状不匹配'],['经验复盘','分享第一次加辅食的手忙脚乱']],
      keyPoints: ['一次引入一种新食物并观察','从少量开始，不追求第一天吃够','性状与吞咽能力匹配，注意过敏和窒息风险']
    }),
    topic({
      id: 'fever', icon: 'thermometer', title: '宝宝发烧，家庭记录怎么做才不慌？', category: '家庭护理',
      structure: '流程清单', tags: ['三星可改', '安全边界'], stars: 3, starLabel: '可以改',
      why: '需求很高，但专业和医疗风险较高；改成“记录与就医沟通准备”，不讲诊断和用药。', creatorFit: '中', creationSpace: '中', difficulty: '中', crowding: '高', medical: '高',
      directions: [['流程清单','只讲体温、精神、进食、排尿的记录方法'],['经验复盘','讲你如何整理信息与医生沟通'],['判断解惑','讲“记录什么”，不替家长下诊断']],
      keyPoints: ['记录测量时间、方式与数值','同时观察精神状态、进食和排尿','婴幼儿年龄、症状和个体情况不同，就医边界应遵医嘱'],
      safetyNote: '高医疗风险选题：Demo 只生成记录与沟通框架，禁止给药剂量、诊断或延误就医的建议。'
    })
  ];

  function fallbackHooks(t, direction) {
    const title = t.title.replace(/[？?]$/,'');
    const sets = {
      '判断解惑': [[`${title}，别急着只听一个结论，先看这3点。`,`很多妈妈都在问：${title}？我把判断思路讲清楚。`,`关于“${title}”，真正要分清的是这几个边界。`],[`同一个表现，在不同情况下答案可能完全不同。`,`别被一句“正常”或“不正常”吓到，先把条件看完整。`,`这一条不下诊断，只帮你整理观察和沟通思路。`]],
      '避坑纠错': [[`关于“${title}”，第一个常见误区很多人都信过。`,`如果你正准备这么做，先避开这3个坑。`,`这件事不是越用力越有效，方法错了反而添麻烦。`],[`别再只凭老人经验做决定，这几个事实先弄清。`,`看起来省事的做法，可能正好忽略了安全边界。`,`新手最容易踩的坑，不是不会做，而是太着急。`]],
      '流程清单': [[`第一次做这件事，按这3步来会清楚很多。`,`别一下准备一大堆，你只要先记住这份小清单。`,`如果你不知道从哪开始，照着“准备—尝试—观察”做。`],[`我把最容易乱的步骤，整理成了手机里能照着看的清单。`,`先别追求一次做对，按顺序记录会更安心。`,`这套流程的重点不是快，而是每一步都能观察。`]],
      '经验复盘': [[`我第一次遇到这件事也很慌，后来才知道先做什么。`,`如果重新来一次，我会少做一件事，多观察三个信号。`,`这不是标准答案，是我走过弯路后留下的经验。`],[`当时我最需要的不是更多知识，而是一条能照着走的顺序。`,`我后来才发现，真正让我不慌的是把信息记清楚。`,`同样是新手，我把自己当时最容易漏掉的细节讲给你。`]]
    };
    return sets[direction] || sets['经验复盘'];
  }
  topics.forEach(t => { if (!t.hooksByDirection) t.hooksByDirection = {}; t.directions.forEach(d => { if (!t.hooksByDirection[d[0]]) t.hooksByDirection[d[0]] = fallbackHooks(t,d[0]); }); });

  const legacyTranscript = {
    postpartum: '最高端的科普，只需要最朴素的方式。产后伤口护理要记住：保持清洁、观察变化、按医嘱护理。如果出现明显红肿、异常分泌物、持续加重的疼痛或发热，要及时联系医生。',
    'pregnancy-food': '孕期食物红黑榜。与其简单记住能吃或不能吃，不如看清食材是否熟透、份量是否合适，以及自己的身体情况。孕期饮食存在个体差异，有特殊情况请咨询医生。',
    'pregnancy-life': '不要问孕妇想吃什么，你做好了她就会吃了。很多时候她不是没有想法，而是已经累到不想再做一个决定。准备两三个安全、舒服的选择，比把问题全部丢回给她更体贴。'
  };
  const benchmarks = [
    {id:'postpartum',sourceType:'legacy_snapshot',sourceLabel:'原育咖采集表·历史快照',icon:'hospital',cover:'pregnancy',title:'产后伤口护理科普之歌第一节',author:'湖南省妇幼保健院产房',category:'产后护理',structure:'流程清单',stars:4,starLabel:'值得拍',likes:3044,favorites:1336,comments:514,shares:6792,capturedAt:'历史快照',learnTags:['机构背书','形式记忆点'],oneLine:'用“科普歌”把生硬的护理知识变得容易记，形式比内容本身更值得借鉴。',whyLearn:'专业内容被做成低门槛记忆形式，适合借鉴表达方式；二创不能照搬具体医疗判断。',hook:'最高端的科普，只需要最朴素的方式。',hookReason:'反差表达先建立记忆点，再用歌谣承接。',flow:['反差开场','生活化科普','口诀重复','安心收尾'],points:['专业内容可以用更轻的形式讲','标题有鲜明形式感','二创应加真实经历与安全边界'],angles:['我产后最希望早点知道的3件事','产后回家前，我问了护士这几个问题','新手妈妈的产后护理记录'],transcriptFull:legacyTranscript.postpartum},
    {id:'pregnancy-food',sourceType:'legacy_snapshot',sourceLabel:'原育咖采集表·历史快照',icon:'salad',cover:'food',title:'孕期食物红黑榜',author:'小李聊孕产',category:'孕期饮食',structure:'对比选择',stars:3,starLabel:'可以改',likes:125,favorites:23,comments:4,shares:92,capturedAt:'历史快照',learnTags:['分类直观','标题明确'],oneLine:'红黑榜结构省理解成本，但要避免把孕期饮食讲成绝对禁忌。',whyLearn:'标题和分类很直接；改编时应把绝对红黑榜改为“场景—份量—个体差异”。',hook:'孕期食物红黑榜。',hookReason:'题目极简，用户立即知道内容收益。',flow:['抛出榜单','红榜解释','黑榜边界','个体差异'],points:['标题直接','对比适合手机观看','需加入来源与非医疗建议边界'],angles:['我怀孕后最常被问的3种食物','别只记能不能吃，先看份量','孕期聚餐我会怎么选'],transcriptFull:legacyTranscript['pregnancy-food']},
    {id:'pregnancy-life',sourceType:'legacy_snapshot',sourceLabel:'原育咖采集表·历史快照',icon:'noodles',cover:'pregnancy',title:'不要问孕妇想吃什么，你做好了她就会吃了',author:'一博家有孕中期',category:'孕期生活',structure:'经验复盘',stars:4,starLabel:'值得拍',likes:5876,favorites:1054,comments:1362,shares:43460,capturedAt:'历史快照',learnTags:['情绪共鸣','伴侣视角'],oneLine:'它讲的不只是吃什么，而是孕期里别把所有决策都丢给她。',whyLearn:'用很小的生活场景表达关系里的情绪价值，容易引发评论和转发。',hook:'不要问孕妇想吃什么。',hookReason:'直接观点有冲突感，让人继续听理由。',flow:['直接观点','真实场景','解释情绪','给伴侣做法'],points:['小场景讲大情绪','开头结论鲜明','二创可切换到妈妈真实细节'],angles:['怀孕后，我最怕听到的一句话','孕期的体贴，不是一直问你要什么','队友感很强的准爸爸会做这3件事'],transcriptFull:legacyTranscript['pregnancy-life']},
    {id:'milk',sourceType:'yaya_pick',sourceLabel:'芽芽精选·示例数据',icon:'bottle',cover:'',title:'吃母乳和吃奶粉，到底有什么区别？',author:'芽芽运营精选',category:'喂养',structure:'对比选择',stars:5,starLabel:'强烈推荐',likes:326000,favorites:68300,comments:9200,shares:18500,capturedAt:'2026-08-16 10:00',learnTags:['问题直接','对比清楚'],oneLine:'不是单纯讲知识，而是在帮助妈妈解决“到底怎么选”。',whyLearn:'开头直达纠结点，正文维度稳定，结尾给出尊重个体选择的判断。',hook:'吃母乳和吃奶粉到底有什么区别？',hookReason:'没有铺垫，直接进入用户真正纠结的问题。',flow:['抛出问题','分点对比','给判断','安抚收尾'],points:['题目具体','围绕一个问题','结尾给判断和安抚'],angles:['母乳不够，要不要马上加奶粉？','混合喂养怎么安排？','我后来为什么选择混合喂养？'],transcriptFull:'吃母乳和吃奶粉到底有什么区别？这不是一道非黑即白的题。每个家庭要结合宝宝生长情况、妈妈身体和实际喂养条件，和专业人员一起做适合自己的选择。'}
  ];
  benchmarks.forEach(b => b.transcriptExcerpt = b.transcriptFull.slice(0,72) + '…');

  const initialDrafts = [
    {id:'food-draft',title:'第一次加辅食最容易错在哪？',sourceType:'topic',sourceId:'food',sourceLabel:'今日值得拍',structure:'流程清单',tone:'自然聊天',updatedAt:'今天 14:28',opening:'第一次给宝宝加辅食，很多妈妈关心的是吃什么，但最容易出错的其实是顺序。',body:'1. 一次只引入一种新食物，方便观察。\n\n2. 从少量开始，不要第一天就追求“吃够”。\n\n3. 食物性状跟着宝宝的吞咽能力调整，同时留意过敏和窒息风险。',ending:'辅食是一次新体验，慢一点、多观察，比吃多少更重要。有特殊情况请咨询专业人员。',advice:'真人口播 + 三个食材道具；每讲一步切换一个近景。',status:'draft'},
    {id:'sleep-draft',title:'宝宝夜醒频繁，到底正常吗？',sourceType:'benchmark',sourceId:'sleep',sourceLabel:'对标二创',structure:'判断解惑',tone:'真实经验',updatedAt:'昨天 22:15',opening:'我家宝宝那阵子频繁夜醒，我最开始总觉得一定是哪里没做好。',body:'后来我不再只数醒了几次，而是一起看吃奶、精神状态和白天作息。每个宝宝阶段不同，夜醒也不能只凭次数下结论。',ending:'先记录、再观察；如果你担心宝宝状态，及时咨询专业人员，比在网上套一个答案更安心。',advice:'夜间卧室场景开头，字幕突出“别只数次数”。',status:'draft'}
  ];

  const academy = [
    {id:'c1',title:'新手拍口播，先把这 3 件事做好',contentType:'课程',duration:'8分钟',problem:'不知道怎么拍',summary:'机位、光线和一句话提纲，先完成再优化。'},
    {id:'c2',title:'没有灵感时，怎么从评论区找到选题',contentType:'运营精选',duration:'6分钟',problem:'不知道拍什么',summary:'把评论问题变成判断型、清单型和经历型选题。'},
    {id:'c3',title:'如何 3 天拍出 10 条优质短视频？',contentType:'直播回放',duration:'68分钟',problem:'更新太慢',summary:'批量选题、集中拍摄和轻量复盘的方法。'},
    {id:'c4',title:'镜头前紧张？先用半露脸和画外音',contentType:'创作者分享',duration:'12分钟',problem:'不敢出镜',summary:'从低压力呈现形式开始建立表达习惯。'},
    {id:'c5',title:'数据不好时，先复盘前 3 秒和选题',contentType:'运营精选',duration:'9分钟',problem:'数据不好',summary:'用可改动项做复盘，不用一次否定账号。'}
  ];
  return {schemaVersion:2, topics, benchmarks, initialDrafts, academy};
})();
