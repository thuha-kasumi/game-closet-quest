export const categories = ['top', 'bottom', 'outer', 'shoes', 'extra'];
export const catalog = [
  ['tee-cream','Cloud tee','top','#f4e9d8','tee','cozy casual neutral'],
  ['tee-rock','Midnight band tee','top','#353345','tee','rock edgy casual'],
  ['knit-pink','Berry knit','top','#e887ae','knit','cozy sweet warm'],
  ['shirt-blue','Sky shirt','top','#9ebed9','shirt','smart campus cool'],
  ['tank-lime','Lime tank','top','#c4d98b','tank','party summer playful'],
  ['top-lilac','Lilac sweetheart','top','#b5a1d9','sweet','party sweet pastel'],
  ['jeans-blue','Everyday denim','bottom','#7196bf','pants','casual campus cool'],
  ['pants-black','After-dark trousers','bottom','#393747','pants','rock smart party'],
  ['skirt-pink','Rose pleats','bottom','#e3a0b7','skirt','sweet party pastel'],
  ['skirt-check','Plaid mini','bottom','#807392','plaid','rock campus edgy'],
  ['shorts-sage','Sage shorts','bottom','#a4bda1','shorts','summer casual playful'],
  ['pants-cream','Sunday wide legs','bottom','#e4d7c0','pants','cozy neutral smart'],
  ['jacket-black','Midnight moto','outer','#383645','jacket','rock edgy warm'],
  ['jacket-denim','Borrowed denim','outer','#7d9db9','jacket','campus casual cool'],
  ['cardigan-pink','Blush cardigan','outer','#dfa0b3','cardigan','sweet cozy warm'],
  ['coat-camel','Cinnamon coat','outer','#b89372','coat','smart neutral warm'],
  ['blazer-lilac','Lavender blazer','outer','#b2a0ce','blazer','smart party pastel'],
  ['shoes-white','Cloud sneakers','shoes','#f8f4ed','sneakers','casual campus cozy'],
  ['boots-black','Stomp boots','shoes','#3b3745','boots','rock edgy warm'],
  ['shoes-red','Cherry Mary Janes','shoes','#ae526e','mary','sweet party smart'],
  ['shoes-green','Matcha sneakers','shoes','#a5b896','sneakers','summer playful casual'],
  ['shoes-tan','Cinnamon loafers','shoes','#ac866a','mary','smart neutral campus'],
  ['bag-yellow','Little sunshine bag','extra','#e6c168','bag','party playful summer'],
  ['bag-pink','Berry shoulder bag','extra','#d187a1','bag','sweet pastel party'],
  ['scarf-green','Matcha scarf','extra','#9caf8d','scarf','warm cozy neutral'],
  ['scarf-purple','Lavender scarf','extra','#a58cc2','scarf','warm pastel sweet'],
  ['bag-black','Midnight mini bag','extra','#444052','bag','rock edgy smart']
].map(([id,name,category,color,shape,tags])=>({id,name,category,color,shape,tags:tags.split(' ')}));
export const prompts = [
 {title:'Hard-rock party',detail:'The music is loud, the night is chilly. Bring a little edge.',tags:['rock','edgy','warm']},
 {title:'Coffee & a study date',detail:'Library first. Your favorite little café afterward.',tags:['campus','cozy','casual']},
 {title:'Rooftop birthday',detail:'Golden hour, birthday cake, and one very good outfit.',tags:['party','playful','sweet']},
 {title:'Your first big presentation',detail:'Feel confident, comfortable, and ready to own the room.',tags:['smart','neutral','campus']},
 {title:'Rainy-day bookstore',detail:'A slow afternoon between the shelves. Keep it cozy.',tags:['cozy','warm','neutral']},
 {title:'Picnic in the park',detail:'A sunny day, a checkered blanket, and room for dessert.',tags:['summer','playful','pastel']},
 {title:'Gallery opening',detail:'A little creative, a little dressed up. Make it yours.',tags:['smart','party','edgy']},
 {title:'Dorm movie marathon',detail:'The snacks are ready. Comfort gets a starring role.',tags:['cozy','casual','warm']}
];
export const defaultOutfit = ()=>({top:'tee-cream',bottom:'jeans-blue',outer:null,shoes:'shoes-white',extra:null,skin:0,hair:0});
