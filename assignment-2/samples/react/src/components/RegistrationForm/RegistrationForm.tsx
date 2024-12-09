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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert("フォームが送信");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>氏名</label>
        <input
          type="text"
          placeholder="(例) トレタ 太郎"
          {...register("name", { required: "氏名は必須です" })}
        />
        {errors.name?.message && <p>{String(errors.name.message)}</p>}
      </div>

      <div>
        <label>Eメール</label>
        <input
          type="email"
          placeholder="(例)yoyaku@toreta.in"
          {...register("email", { required: "Eメールは必須です" })}
        />
        {errors.email?.message && <p>{String(errors.email.message)}</p>}
      </div>

      <div>
        <label>郵便番号</label>
        <input
          type="text"
          placeholder="(例)0000000"
          {...register("postalCode", { required: "郵便番号は必須です" })}
        />
        {errors.postalCode?.message && (
          <p>{String(errors.postalCode.message)}</p>
        )}
      </div>

      <div>
        <label>都道府県</label>
        <select
          {...register("prefecture", {
            required: "都道府県を選択してください",
          })}
        >
          <option value="">選択してください</option>
          <option value="東京都">東京都</option>
          <option value="大阪府">大阪府</option>
        </select>
        {errors.prefecture?.message && (
          <p>{String(errors.prefecture.message)}</p>
        )}
      </div>

      <div>
        <label>市区町村・番地</label>
        <input
          type="text"
          placeholder="(例)品川区西五反田7丁目22-17"
          {...register("address", { required: "市区町村・番地は必須です" })}
        />
        {errors.address?.message && <p>{String(errors.address.message)}</p>}
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
