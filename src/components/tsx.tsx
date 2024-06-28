export default function TSX() {
  type Score = "A" | "B" | "C" | "F";
  interface User {
    name: String;
    age?: number;
    gender?: boolean; //optional
    readonly birth?: number;
    [grade: number]: Score; //number로 키 string으로 밸류
  }
  let user: User = {
    name: "dd",
    age: 30,
    birth: 2000,
    1: "A",
  };
  user.age = 20;
  //   user.birth = 2003;  readonly 수정 불가

  //
  //인터페이스로 함수 정의
  interface Add {
    (num1: number, num2: number): number;
  }
  const add: Add = function (x, y) {
    return x + y;
  };

  interface isAdult {
    (age: number): boolean;
  }
  const a: isAdult = (age) => {
    return age > 19;
  };

  //인터페이스로 클래스 구현

  interface Car {
    color: string;
    wheels: number;
  }
  class BMW implements Car {
    color = "red";
    wheels = 4;
    constructor(c: string) {
      this.color = c;
    }
    start() {
      console.log("start..");
    }
  }
  const cc = new BMW("blue");

  // 인터페이스 확장 extends
  interface Benz extends Car {
    door: number;
    stop(): void;
  }
  const benz: Benz = {
    color: "green",
    wheels: 4,
    door: 5,
    stop() {
      console.log("stop...");
    },
  };
  interface Toy {}
  interface ToyCar extends Toy, Car {
    //다중
  }
  //
  //함수
  function hello(name?: string): void {
    //명시적으로 props 안넣어도 된다는걸 알려줘야함
    console.log(`hello, ${name || "world"}`);
  }
  function hello2(name = "world"): void {
    //이렇게 해도 똑같음 기본값 부여
    console.log(`hello, ${name}`);
  }
  function hello3(age: number | undefined, name: string): void {
    //선택적 props를 앞에 하려면 이렇게 하시오 전달할때도 명시적으로 undefined전달
    console.log(`hello, ${name} ${age}`);
  }

  function add2(...nums: number[]) {
    //...은 배열
    return nums.reduce((result, num) => result + num, 0);
  }
  //
  //this
  const Sam: User = {
    name: "Sam",
  };
  function showName(this: User, age: number) {
    //this타입 정하려면 props에 this 타입 설정
    //지정시는 this안넣음 showName(30) 이렇게 만 해도 된다.
    console.log(this.name, age);
  }
  //동일한 매개변수지만 다른 타입 return 가능할 때, 함수 오버로드 사용
  function join(name: string, age: string): string;
  function join(name: string, age: number): User;
  function join(name: string, age: number | string): User | string {
    if (typeof age === "number") {
      return {
        name,
        age,
      };
    } else {
      return "나이는 숫자로 입력해주세요";
    }
  }
  const sam: User = join("sam", 30);

  //리터럴 타입
  const userName1 = "bob"; //bob 타입 (변하지 않으니)
  let userName2 = "tom"; // string 타입 (변할 수 있으니)
  let userName3: string | number = "amy";
  //유니온타입 (or)
  type Job = "police" | "developer" | "teacher";
  //교체타입 intersection types (and)
  const toyCar: Toy & Car = {
    //속성을 다 적어줘야함
    color: "red",
    wheels: 4,
  };
  //클래스
  class Car2 {
    // color: string;
    constructor(public color: string) {
      this.color = color;
    }
  }
  //접근 제한자-
  //public-자식클래스,클래스 인스턴스 모두 가능 ,  #private-본인만 , protected - 자식클래스에서만

  // static <클래스 명.속성> 이런 방식으로만 접근 가능 this ㄴㄴ

  //추상 클래스 클래스 앞에 abstract
  //new 사용 불가 상속만 가능
  // 추상 메소드는 상속받은 쪽에서 구현 필수

  //제네릭 Generic
  function getSize<T>(arr: T[]): number {
    return arr.length;
  }
  getSize<number>([1, 2, 3]); //사용할 때 타입 지정
  getSize<string>(["a", "b"]);

  interface K<T> {
    option: T;
  }
  const K1: K<number> = {
    option: 2,
  };
  const K2: K<{ color: string; price: number }> = {
    option: { color: "red", price: 30000 },
  };

  //
  //유틸리티 타입
  //Partial<T>
  interface User2 {
    id: number;
    name: string;
    age: number;
    gender: "m" | "f";
  }
  let admin: Partial<User2> = {
    // 모든 속성에 ? (옵셔널) 붙인거랑 같다.
    id: 1,
  };

  //Required<T>
  interface User3 {
    id?: number;
    name: string;
  }
  let admin2: Required<User3> = {
    //모든 속성을 필수로 적어야 한다.
    id: 3,
    name: "jane",
  };
  //Readonly<T>  //값을 할당만 가능하고 사용은 불가능

  //Record<K,T> (key,type이라는 뜻)
  type Grade = "1" | "2" | "3" | "4";
  type Score2 = "A" | "B" | "C" | "D";
  const score: Record<Grade, Score2> = {
    1: "A",
    2: "B",
    3: "C",
    4: "A",
  };

  //Pick<T,K>
  const admin3: Pick<User2, "id" | "name"> = {
    //User에서 id와 name만 가져와서 사용 가능
    id: 0,
    name: "jin",
  };

  // Omit<T,K> Pick이랑 반대로 속성을 제외할 수 있다.
  // Exclude<T1,T2> T1의 속성 중 T2의 속성과  겹치는 것을 제외할 수 있다.
  // NonNullable<T> - null과 undefined 제외할 수 있다.
  type T1 = string | null | undefined | number;
  type T2 = NonNullable<T1>;
  return (
    <>
      <div></div>
    </>
  );
}
