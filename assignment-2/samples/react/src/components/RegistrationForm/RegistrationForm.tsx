import { useForm } from "react-hook-form";
import "./RegistrationForm.css";
import { useFormSubmit } from "../../hooks/useFormSubmit";

type FormData = {
  name: string;
  email: string;
  postalCode: string;
  prefecture: string;
  address: string;
  building?: string;
};

const RegistrationForm = () => {
  const { submitForm } = useFormSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="input-group">
          <label>氏名</label>
          <input
            type="text"
            placeholder="(例) トレタ 太郎"
            {...register("name", { required: "氏名は必須です" })}
          />
        </div>
        {errors.name?.message && (
          <p className="error-message">{String(errors.name.message)}</p>
        )}
      </div>

      <div>
        <div className="input-group">
          <label>Eメール</label>
          <input
            type="email"
            placeholder="(例)yoyaku@toreta.in"
            {...register("email", { required: "Eメールは必須です" })}
          />
        </div>
        {errors.email?.message && (
          <p className="error-message">{String(errors.email.message)}</p>
        )}
      </div>

      <div>
        <div className="input-group">
          <label>郵便番号</label>
          <input
            type="text"
            placeholder="(例)0000000"
            {...register("postalCode", { required: "郵便番号は必須です" })}
          />
        </div>
        {errors.postalCode?.message && (
          <p className="error-message">{String(errors.postalCode.message)}</p>
        )}
      </div>

      <div>
        <div className="input-group">
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
        </div>
        {errors.prefecture?.message && (
          <p className="error-message">{String(errors.prefecture.message)}</p>
        )}
      </div>

      <div>
        <div className="input-group">
          <label>市区町村・番地</label>
          <input
            type="text"
            placeholder="(例)品川区西五反田7丁目22-17"
            {...register("address", { required: "市区町村・番地は必須です" })}
          />
        </div>
        {errors.address?.message && (
          <p className="error-message">{String(errors.address.message)}</p>
        )}
      </div>

      <div>
        <div className="input-group">
          <label>建物名・号室</label>
          <input
            type="text"
            placeholder="(例)TOCビル 8F"
            {...register("building")}
          />
        </div>
      </div>

      <div className="button-container">
        <button type="submit">登録</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
