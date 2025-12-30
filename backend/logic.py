import re
from collections import Counter

STOPWORDS = {
    "the", "is", "and", "a", "an", "in", "on", "of", "to", "for", "with",
    "at", "by", "from", "up", "about", "into", "over", "after", "this",
    "that", "it", "as", "be", "are", "was", "were", "have", "has", "had"
}

def analyze_text(content: str) -> dict:
    # Summary: first 150 chars
    summary = content[:150] + "..." if len(content) > 150 else content
    
    # Keyword extraction
    # Remove non-alphanumeric (keep spaces)
    clean_text = re.sub(r'[^a-zA-Z\s]', '', content.lower())
    words = clean_text.split()
    
    # Filter stopwords
    filtered_words = [w for w in words if w not in STOPWORDS and len(w) > 2]
    
    # Count frequency
    counter = Counter(filtered_words)
    top_3 = counter.most_common(3)
    
    # Format tags as comma-separated string
    tags = ", ".join([word for word, count in top_3])
    
    return {
        "summary": summary,
        "tags": tags
    }
