package com.abid.book.feedback;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class FeedBackService {

    public Integer save(FeedbackRequest request, Authentication connectedUser) {
        return null;
    }
}
