import { useForm } from "react-hook-form";
import "./RegistrationForm.css";

type FormData = {
  name: string;
  email: string;
  postalCode: string;
  prefecture: string;
  address: string;
  building?: string;
};

const RegistrationForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert("フォームが送信");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>氏名</label>
        <input type="text" placeholder="(例) トレタ 太郎" />
      </div>

      <div>
        <label>Eメール</label>
        <input type="email" placeholder="(例)yoyaku@toreta.in" />
      </div>

      <div>
        <label>郵便番号</label>
        <input type="text" placeholder="(例)0000000" />
      </div>

      <div>
        <label>都道府県</label>
        <select>
          <option value="">選択してください</option>
          <option value="東京都">東京都</option>
          <option value="大阪府">大阪府</option>
        </select>
      </div>

      <div>
        <label>市区町村・番地</label>
        <input type="text" placeholder="(例)品川区西五反田7丁目22-17" />
      </div>

      <div>
        <label>建物名・号室</label>
        <input
          type="text"
          placeholder="(例)TOCビル 8F"
          {...register("building")}
        />
      </div>

      <button type="submit">登録</button>
    </form>
  );
};

export default RegistrationForm;
