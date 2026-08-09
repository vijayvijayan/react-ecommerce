import { Editor } from "@tinymce/tinymce-react";

type TinyEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const TinyEditor = ({ value, onChange }: TinyEditorProps) => {
  return (
    <Editor
apiKey="r8tkvtzu9sec5j2o01x6yc7duh5woimt6wtlsojklij8ugza"
      value={value}
      onEditorChange={(newValue: string) => onChange(newValue)}
      init={{
        height: 300,
        plugins: "lists link image code",
        toolbar:
          "undo redo | bold italic | bullist numlist | link image | code",
      }}
    />
  );
};

export default TinyEditor;
