type State = { step: "grade" | "medium" | "class"; grade?: string; medium?: string };
const states = new Map<string, State>();

const welcome = `ආයුබෝවන්! 👋\nScience Online Class එකට සාදරයෙන් පිළිගන්නවා.\n\nඔබගේ ශ්‍රේණිය තෝරන්න:\n1 - Grade 6\n2 - Grade 7\n3 - Grade 8\n4 - Grade 9\n5 - Grade 10\n6 - Grade 11`;

export function replyFor(phone: string, raw: string): string {
  const msg = raw.trim().toLowerCase();
  if (["hi","hello","start","menu","restart"].includes(msg)) {
    states.set(phone, { step: "grade" });
    return welcome;
  }

  const state = states.get(phone) ?? { step: "grade" as const };

  if (state.step === "grade") {
    const grades: Record<string,string> = {"1":"6","2":"7","3":"8","4":"9","5":"10","6":"11"};
    const grade = grades[msg];
    if (!grade) return welcome;
    states.set(phone, { step: "medium", grade });
    return `Grade ${grade} තෝරාගත්තා ✅\n\nමාධ්‍යය තෝරන්න:\n1 - Sinhala Medium\n2 - English Medium\n\n0 - Back`;
  }

  if (state.step === "medium") {
    if (msg === "0") { states.set(phone,{step:"grade"}); return welcome; }
    const medium = msg === "1" ? "Sinhala Medium" : msg === "2" ? "English Medium" : undefined;
    if (!medium) return `කරුණාකර 1 හෝ 2 තෝරන්න.\n1 - Sinhala Medium\n2 - English Medium\n0 - Back`;
    states.set(phone, { ...state, step: "class", medium });
    return `${state.grade} ශ්‍රේණිය - ${medium} ✅\n\nඔබට අවශ්‍ය පන්තිය තෝරන්න:\n1 - Theory Class\n2 - Revision Class\n3 - Paper Class\n\n0 - Back`;
  }

  if (state.step === "class") {
    if (msg === "0") { states.set(phone,{step:"medium",grade:state.grade}); return `මාධ්‍යය තෝරන්න:\n1 - Sinhala Medium\n2 - English Medium`; }
    const cls = msg === "1" ? "Theory Class" : msg === "2" ? "Revision Class" : msg === "3" ? "Paper Class" : undefined;
    if (!cls) return `කරුණාකර 1, 2 හෝ 3 තෝරන්න.\n1 - Theory Class\n2 - Revision Class\n3 - Paper Class\n0 - Back`;
    states.delete(phone);
    return `🎓 Grade ${state.grade} - ${state.medium}\n📚 ${cls}\n\n📅 සතිපතා Online Class\n💻 Zoom හරහා පන්ති පැවැත්වේ\n🎥 Recording ලබා දේ\n📝 Notes සහ ප්‍රශ්න පත්‍ර ලබා දේ\n\n💳 පන්ති ගාස්තු සහ ලියාපදිංචි වීමේ විස්තර සඳහා මෙම message එකට *REGISTER* ලෙස reply කරන්න.\n\nනැවත මුලට යාමට *MENU* ලෙස reply කරන්න.`;
  }

  return welcome;
}
