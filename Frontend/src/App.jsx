import { useState} from "react";
import "./App.css";

function App(){
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author , setAuthor] = useState("");
  const [category, setCategory] = useState("Technology");
  const [image , setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
  } 
};

const handleSaveDraft = () => {
   if (!title.trim() || !content.trim()){
    setStatus("Please enter a title and content.");
    return;
   }
   const draft = {
    title,
    contnet,
    author,
    category,
    image,
    status: "draft",
    createdAt: new Date().toISOString(),
   };
   localStorage.setItem("blogDraft",JSON.stringify(draft));
   setStatus("Draft Saved Successfylly!");
};

const handleLoadDeaft = () => {
  const savedDraft = localStorage.getItem("blogDraft");
  if(!savedDraft) {
    setStatus("No saved draft found.");
    return;
  }
  const draft = JSON.parse(savedDraft);
    setTitle(draft.title || "")
    setontent(draft.content || "")
    setauthor(draft.author || "")
    setCategory(draft.category || "Technology");
    setImage(draft.image|| null);

    setStatus("Draft Loaded Successfully");
  };

  const handleClear = () => {
     setTitle(draft.title || "")
    setontent(draft.content || "")
    setauthor(draft.author || "")
    setCategory(draft.category || "Technology");
    setImage(draft.image|| null);
    setStatus("");
  };

  return (
    <div className="app">
      {/* Header*/ }
      <header className="header">
        <div>
          <h1>Blog Creator</h1>
          <p>Create, edit and preview your bolg in real time</p>
        </div>
        <div className="header-buttons">
          <button
          className="load-btn"
          onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </header>
      { /* Main Content */}
      <main className="container">
        <section className="card editor">
          <div className="section-heading">
            <div>
              <h2>Blog Editor</h2>
              <p>write your article here</p>
            </div>
            <span className="draft-label">
              DRAFT
            </span>
          </div>
          <div className="from-group">
            <label>Blog Title</label>
            <input
                  type="text"
                  placeholder="Enter Your blog title.."
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  />
          </div>
          <div className="from-group">
            <label>Featured Image</label>

            <input
            type ="file"
            accept = "image/*"
            onChange={handleImageChange}
            />
            {image&&(
              <div className="uploaded-image">
                <img
                  src={image}
                  alt="Featured"
                  />
                  </div>

            )}
          </div>
          <div className="from-group">
            <label>Blog Content</label>

            <textarea
                    placeholder="Start Writing Your Blog"
                    value={content}
                    onChange={(event) =>
                      setContent(event.target.value)
                    }
                    />
                </div>
                <div className="editor-actions">
                  <button
                  className="save-btn"
                  onclick={handleClear}
                  >
                  Reset
                  </button>
                  </div>
                  {status && (
                    <div className="satus">
                      {status}
                    </div>
                  )}
        </section>
        <section className="card preview">
          <div className="section-heading">
            <div>
              <h2>Live preview</h2>
              <p>Your Published article will looks like this</p>
          </div>
          <span className="live-label">
            LIVE
          </span>
          </div>
          <article className="article-preview">
            {image ?(
              <img
              className="preview-image"
              src={image}
              alt="Blog Featured"
              />
            ): (
              <div
              className="image-placeholder">
                 Featured Image
              </div>
            )}
            <span className="category">
              {category}
            </span>
            <h1>
              {title || " Your Blog Title"}
            </h1>

            <div className="article-meta">
              <span>
                By {author || "Author Name"}
                </span>
                <span>.</span>
                <span>
                  {new
                  Date().toLocaleDateString()}
                  </span>
            </div>
            <hr />
            <div className="article-content">
              {content ? (
                content 
                    .split("\n")
                    .map((paragraph, index) =>(
                      <p key={index}>
                        {paragraph}
                      </p>
                    ))
              ) :(
                <p
                className="placeholder-text"> Your blog will appear here
                as you type
                </p>
              )}
            </div>
          </article>
        </section>
      </main>
      <footer>
        <p>
          Blog Creator Live Preview System
        </p>
      </footer>
    </div>
  );
export default App;
