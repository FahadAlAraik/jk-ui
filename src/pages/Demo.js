import React, { useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/esm/Button";
import MarqueeControls from "../components/MarqueeControls";
import MarqueeDisplay from "../components/MarqueeDisplay";
import TextArModal from "../TextArModal";
import "../styles.css";

function Demo({ onRestart }) {
  const [text, setText] = useState("");
  const [translatedTexts, setTranslatedTexts] = useState({
    text_en: `Indeed, all praise is due to Allah. We praise Him, seek His help, and seek His forgiveness. We seek refuge in Allah from the evil within ourselves and from our bad deeds. Whomsoever Allah guides, none can misguide; and whomsoever He allows to go astray, none can guide. I bear witness that there is no deity worthy of worship except Allah, alone with no partner, and I bear witness that Muhammad is His servant and messenger."  [O you who have believed, fear Allah as He should be feared and do not die except as Muslims] (Surah Aal Imran, 3:102)  [O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women. And fear Allah, through whom you ask one another, and the wombs. Indeed, Allah is ever, over you, an Observer.] (Surah An-Nisa, 4:1)`,
    text_bn: `নিশ্চয়ই সমস্ত প্রশংসা আল্লাহর জন্য। আমরা তাঁকে প্রশংসা করি, তাঁর সাহায্য চাই, তাঁর নিকট ক্ষমা প্রার্থনা করি এবং নিজেদের মন্দ প্রবৃত্তি ও খারাপ কাজ থেকে আল্লাহর কাছে আশ্রয় চাই। যাকে আল্লাহ হিদায়াত দেন, তাকে কেউ বিভ্রান্ত করতে পারে না; আর যাকে তিনি বিভ্রান্ত করেন, তাকে কেউ হিদায়াত দিতে পারে না। আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো অংশীদার নেই; এবং আমি সাক্ষ্য দিচ্ছি যে, মুহাম্মদ (সাল্লা`,
    text_ur: `تمام تعریفیں اللہ کے لیے ہیں، ہم اسی کی تعریف کرتے ہیں، اسی سے مدد چاہتے ہیں، اسی سے بخشش طلب کرتے ہیں، اور اپنے نفسوں کی برائیوں اور اپنے اعمال کی برائیوں سے اللہ کی پناہ چاہتے ہیں۔ جسے اللہ ہدایت دے، اسے کوئی گمراہ نہیں کر سکتا، اور جسے وہ گمراہ کر دے، اسے کوئی ہدایت دینے والا نہیں۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔ اور میں گواہی دیتا ہوں کہ محمد ﷺ اللہ کے بندے اور اس کے رسول ہیں۔  (قرآن مجید کی آیات): (آل عمران 102): "اے ایمان والو! اللہ سے اس طرح ڈرو جیسا کہ اس سے ڈرنے کا حق ہے، اور تمہیں موت نہ آئے مگر اس حال میں کہ تم مسلمان ہو۔"  (النساء 1): "اے لوگو! اپنے رب سے ڈرو، جس نے تمہیں ایک جان سے پیدا کیا، اور اسی سے اس کا جوڑا پیدا کیا، اور ان دونوں سے بہت سے مرد و عورت پھیلائے۔ اور اللہ سے ڈرو جس کے نام پر تم ایک دوسرے سے مانگتے ہو، اور رشتہ داریوں کے بارے میں بھی۔ یقیناً اللہ تم پر نگرانی کرنے والا ہے۔"  (الأحزاب 70-71): "اے ایمان والو! اللہ سے ڈرو اور بات سیدھی کہا کرو۔ وہ تمہارے اعمال سنوار دے گا اور تمہارے گناہ معاف فرما دے گا، اور جو اللہ اور اس کے رسول کی اطاعت کرے تو وہ بڑی کامیابی پا گیا۔"  (اما بعد): اللہ تعالیٰ نے فرمایا: (القصص 68): "اور تیرا رب جو چاہے پیدا کرتا ہے اور (جسے چاہے) منتخب کر لیتا ہے۔"  اسی بنا پر اللہ تعالیٰ نے بعض دنوں کو بعض پر فضیلت دی ہے۔ ہفتے کے دنوں میں سب سے افضل دن جمعہ کا دن ہے۔ حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: "سب سے بہتر دن جس پر سورج طلوع ہوا، جمعہ کا دن ہے۔ اسی دن آدم کو پیدا کیا گیا، اسی دن انہیں جنت میں داخل کیا گیا، اور اسی دن انہیں جنت سے نکالا گیا، اور قیامت بھی جمعہ کے دن ہی قائم ہوگی۔" (روایت مسلم) `,
    text_ar: `إن الحمد لله، نحمده ونستعينه ونستغفره، ونعوذ بالله من شرور أنفسنا وسيئات أعمالنا، من يهده الله فلا مضل له، ومن يضلل فلا هادي له، وأشهد أن لا إله إلا الله وحده لا شريك له، وأشهد أن محمداً عبده ورسوله. {يَا أَيُّهَا الَّذِينَ آمَنُواْ اتَّقُواْ اللّهَ حَقَّ تُقَاتِهِ وَلاَ تَمُوتُنَّ إِلاَّ وَأَنتُم مُّسْلِمُونَ}(آل عمران - 102)، {يَا أَيُّهَا النَّاسُ اتَّقُواْ رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالاً كَثِيرًا وَنِسَاءً ۚ وَاتَّقُواْ اللّهَ الَّذِي تَسَاءلُونَ بِهِ وَالأَرْحَامَ ۚ إِنَّ اللّهَ كَانَ عَلَيْكُمْ رَقِيبًا}(النساء - 1)، {يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَقُولُوا قَوْلًا سَدِيدًا * يُصْلِحْ لَكُمْ أَعْمَالَكُمْ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ ۗ وَمَن يُطِعِ اللَّهَ وَرَسُولَهُ فَقَدْ فَازَ فَوْزًا عَظِيمًا}(الأحزاب - 70-71). أما بعد: قال تعالى: {وَرَبُّكَ يَخْلُقُ مَا يَشَاء وَيَخْتَارُ}(القصص - 68)، ومن هذا تفضيلُ الله عز وجل بعضَ الأيام على بعض، فخيرُ أيام الأسبوع يوم الجمعة، فعن أبي هريرة رضي الله عنه أن النبي صلى الله عليه وسلم قال: "خير يوم طلعت عليه الشمس يوم الجمعة، فيه خلق آدم، وفيه أُدخل الجنة، وفيه أُخرج منها، ولا تقوم الساعة إلا في يوم الجمعة" رواه مسلم. `,
    elapsed_time: "22",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [marqueeStarted, setMarqueeStarted] = useState(false);
  const [forceStop, setForceStop] = useState(false); // State to track force stop
  const [marqueeSpeed, setMarqueeSpeed] = useState(500); // State for marquee speed
  const [delay, setDelay] = useState(3); // State for marquee delay
  const [textSize, setTextSize] = useState(140); // State for marquee speed
  const [showUpload, setShowUpload] = useState(true); // Controls visibility of upload UI

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/text`, { text },{withCredentials:true});
      
//       setTranslatedTexts(response.data);
      
//       if (response.data.text_ar) {
//         setShowModal(true); // Let modal open first
//       } else {
//         setMarqueeStarted(true); // No modal? Start marquee right away
//       }
      
//       console.log("Text translation successful:", response.data);
//       setShowUpload(false); // Hide upload UI after translation
//     } catch (error) {
//       console.error("Error translating text:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleCloseModal = () => {
    setShowModal(false);
    setMarqueeStarted(true);
  };

  const handleShowUpload = () => {
    setShowUpload(true);
    setText("");
    onRestart(); // Call onRestart to show selection buttons in App
  };

  return (
    <div className="App">
        <>
        <br/>
        <br/>
        <MarqueeDisplay
            texts={translatedTexts}
            speed={marqueeSpeed}
            delay={delay}
            textSize={textSize}
            play={!forceStop && marqueeStarted}
          />

          <h4
            className="m-2"
            style={{ textAlign: "center", color: "var(--Gray-1)" }}
          >
            الوقت المستغرق هو{" "}
            {Math.round(parseFloat(translatedTexts.elapsed_time))} ثانية
          </h4>

          <MarqueeControls
            speed={marqueeSpeed}
            setSpeed={setMarqueeSpeed}
            forceStop={forceStop}
            setForceStop={setForceStop}
            onReset={() => {
              setShowUpload(true);
              setText("");
              onRestart();
            }}
          />
        </>
            <TextArModal
            show={showModal}
            onHide={handleCloseModal}
            textAr={translatedTexts.text_ar}
          />

    </div>
  );
}

export default Demo;