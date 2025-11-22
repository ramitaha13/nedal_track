import React, { useState } from "react";
import { Truck, Search, Sparkles, X, Loader, Send } from "lucide-react";

const HeavyEquipmentCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAIChat, setShowAIChat] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const GEMINI_API_KEY = "AIzaSyDNC5KER8zQD1M2CmAwVvs9PksLllvKLX4";
  const GEMINI_MODEL = "gemini-2.5-flash";

  const equipment = [
    {
      id: 1,
      name: "מחפרון",
      emoji: "🚜",
      desc: "כלי רב-תכליתי לחפירה ומילוי",
      price: "2,500-4,500 ₪/יום",
    },
    {
      id: 2,
      name: "באגר",
      emoji: "🚧",
      desc: "משלב מחפר מאחור ומטען מלפנים",
      price: "2,000-3,200 ₪/יום",
    },
    {
      id: 3,
      name: "מיני באגר",
      emoji: "⚙️",
      desc: "מחפרון קטן לעבודות מדויקות",
      price: "1,400-2,500 ₪/יום",
    },
    {
      id: 4,
      name: "בולדוזר",
      emoji: "🏗️",
      desc: "כלי כבד לפילוס שטחים",
      price: "3,000-5,500 ₪/יום",
    },
    {
      id: 5,
      name: "מחפר גלגלים",
      emoji: "🚚",
      desc: "מחפר על גלגלים לניידות מהירה",
      price: "2,300-3,800 ₪/יום",
    },
    {
      id: 6,
      name: "גרדר",
      emoji: "🛤️",
      desc: "מפלס ומיישר משטחים בדיוק",
      price: "3,200-5,000 ₪/יום",
    },
  ];

  const filtered = equipment.filter((item) => item.name.includes(searchTerm));

  const askGemini = async (question) => {
    setIsLoading(true);
    try {
      const context = `אתה עוזר AI מומחה בציוד כבד. 
ציוד זמין: ${equipment.map((e) => `${e.name} (${e.price})`).join(", ")}
ענה בעברית בקצרה ובאופן מקצועי.
שאלה: ${question}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: context }] }],
          }),
        }
      );

      const data = await res.json();
      const aiMsg = data.candidates[0].content.parts[0].text;

      setChatHistory([
        ...chatHistory,
        { type: "user", msg: question },
        { type: "ai", msg: aiMsg },
      ]);
      setUserQuestion("");
    } catch (error) {
      setChatHistory([
        ...chatHistory,
        { type: "user", msg: question },
        { type: "ai", msg: "שגיאה, נסה שוב" },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <Truck className="w-12 h-12 text-orange-600" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                קטלוג ציוד כבד
              </h1>
              <p className="text-gray-600">מחירים מעודכנים לציוד עפר</p>
            </div>
            <button
              onClick={() => setShowAIChat(!showAIChat)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              <Sparkles className="w-6 h-6" />
            </button>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="חיפוש..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 outline-none"
            />
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
            >
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <span className="text-5xl">{item.emoji}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-3">{item.desc}</p>
                <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200 text-center">
                  <p className="text-2xl font-bold text-green-700">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Chat */}
        {showAIChat && (
          <div className="fixed bottom-4 left-4 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl z-50">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold">עוזר AI</h3>
              </div>
              <button onClick={() => setShowAIChat(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>שאל אותי על ציוד כבד! 🚜</p>
                </div>
              ) : (
                chatHistory.map((chat, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      chat.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-lg ${
                        chat.type === "user"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{chat.msg}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="bg-gray-100 p-3 rounded-lg w-fit">
                  <Loader className="w-5 h-5 animate-spin text-purple-600" />
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (userQuestion.trim()) askGemini(userQuestion);
              }}
              className="p-4 border-t"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="שאל שאלה..."
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !userQuestion.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeavyEquipmentCatalog;
